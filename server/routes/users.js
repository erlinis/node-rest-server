const express  = require('express')
const app      = express()

const bcrypt   = require('bcrypt');
const _        = require('underscore');

const User     = require('../models/user');

app.get('/users', function (request, response) {

 let offset = Number(request.query.offset) || 0;
 let limit  = Number(request.query.limit) || 5;

  User.find({})
      .skip(offset)
      .limit(limit)
      .exec( (err, users) =>{
        if(err){
          return response.status(400).json(errorResponse(err));
        }


        User.count({}, (err, totalUsers) => {
          response.json({
            ok: true,
            users,
            totalUsers: totalUsers
          });
        });
      });
});

app.post('/users', function (request, response) {
  let body = request.body;

  let user = new User({
   name: body.name,
   email: body.email,
   password: bcrypt.hashSync(body.password,10),
   role: body.role
  });

  user.save((err, userCreated) => {
    if(err){
      return response.status(400).json(errorResponse(err));
    }

    response.json({
      ok: true,
      user: userCreated
    });
  });
});

app.put('/users/:id', function (request, response) {
  const permitted_params = ['name', 'email', 'role', 'active', 'image']

  let id = request.params.id;
  let body = _.pick(request.body, permitted_params);

  User.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, user) =>{
    if(err){
      return response.status(400).json(errorResponse(err));
    }

    response.json({
      ok: true,
      user: user
    });
  });
});

app.delete('/users', function (request, response) {
  response.json('DELETE users')
});

let errorResponse = errorMsg => {
  return {
    ok: false,
    message: errorMsg
  }
}

module.exports = app;

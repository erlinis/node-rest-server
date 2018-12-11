const express  = require('express')
const app      = express()

const User = require('../models/user');

app.get('/users', function (request, response) {
  response.json('GET users')
});

app.post('/users', function (request, response) {
  let body = request.body;

  let user = new User({
   name: body.name,
   email: body.email,
   password: body.password,
   role: body.role
  });

  user.save((err, userCreated) => {
    if(err){
      response.status(400).json({
        ok: false,
        message: err,
      });
    }

    response.json({
      ok: true,
      user: userCreated
    });
  });
});

app.put('/users/:id', function (request, response) {
  let id = request.params.id;
  response.json({id});
});

app.delete('/users', function (request, response) {
  response.json('DELETE users')
});

module.exports = app;

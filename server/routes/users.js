const express  = require('express')
const app      = express()

app.get('/users', function (request, response) {
  response.json('GET users')
});

app.post('/users', function (request, response) {
  let body = request.body;

  if (body.name === undefined) {
    response.status(400).json({
      ok: false,
      message: 'Name is required'
    });
  } else {
      response.json({person: body});
  }
});

app.put('/users/:id', function (request, response) {
  let id = request.params.id;
  response.json({id});
});

app.delete('/users', function (request, response) {
  response.json('DELETE users')
});

module.exports = app;

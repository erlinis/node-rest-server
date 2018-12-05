require('./config/config');

const mongoose = require('mongoose');
const express  = require('express')
const app      = express()
var bodyParser = require('body-parser');

const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


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

mongoose.connect('mongodb://localhost:27017/coffee', (err, res) => {
 if(err){ throw err; }

 console.log(`Database connected...`);
});

app.listen(port, () =>{
  console.log(`Listening in port ${port}`);
});


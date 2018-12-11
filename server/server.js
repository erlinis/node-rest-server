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
app.use(require('./routes/users'));

mongoose.connect('mongodb://localhost:27017/coffee', (err, res) => {
 if(err){ throw err; }

 console.log(`Database connected...`);
});

app.listen(port, () =>{
  console.log(`Listening in port ${port}`);
});


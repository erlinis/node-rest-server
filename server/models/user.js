// User model structure definition

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);

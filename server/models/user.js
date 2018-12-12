// User model structure definition

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is an invalid ROLE'
}
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    unique: true,
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
    enum: roles
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

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.'});
module.exports = mongoose.model('User', userSchema);

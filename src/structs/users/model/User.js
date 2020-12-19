'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  pixKey: { type: String, required: true },
 
});

module.exports = mongoose.model('User', userModel);
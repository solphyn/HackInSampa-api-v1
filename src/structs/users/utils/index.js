'use strict';

const jwt = require('jsonwebtoken');
//const secret = require('../../../config');
const Boom = require('boom');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

function createToken(user) {
  let scopes;

  if (user.admin) {
    scopes = 'admin';
  }

  return jwt.sign({ id: user._id, username: user.username, scope: scopes }, 'HackInSampa', { algorithm: 'HS256', expiresIn: "1h" } );
}

function verifyUniqueUser(req, res) {

    User.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (err, user) => {

    if (user) {
      if (user.email === req.payload.email) {
        res(Boom.badRequest('Deu Ruim'));
        return;
      }
    }
    res(req.payload);
  });
}

function hashPassword(password, cb) {
  
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

function verifyCredentials(req, res) {

  const password = req.payload.password;

  User.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (err, user) => {
    if (!user) {
      return res(Boom.badRequest('Usuario Incorreto'));
    }
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (isValid) {
        return res(user);
      }
      res(Boom.badRequest('Usuario Incorreto'));      
    });
  });
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials,
  createToken: createToken,
  hashPassword:hashPassword
}

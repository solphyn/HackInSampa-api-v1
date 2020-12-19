'use strict';

const Boom = require('boom');
const User = require('../model/User');
const { verifyCredentials, createToken } = require('../utils');


module.exports = {
  method: 'POST',
  path: '/users/authenticate',
  config: {
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      res({ id_token: createToken(req.pre.user) }).code(201);
    }
  }  
}

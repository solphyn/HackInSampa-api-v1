'use strict';

const bcrypt = require('bcryptjs');
const Boom = require('boom');
const User = require('../model/User');
const { verifyUniqueUser, hashPassword } = require('../utils');

module.exports = {
  method: 'POST',
  path: '/users',
  config: {
    pre: [
      { method: verifyUniqueUser }
    ],

    handler: (req, res) => {

      let user = new User();
      user.firstName = req.payload.firstName;
      user.lastName = req.payload.lastName;         
      user.email = req.payload.email;
      user.password = req.payload.password;
      user.pixKey = req.payload.pixKey;


      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err);
        }

        user.password = hash;

        user.save((err, user) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          
          res("Criado com Sucesso").code(201);
        });
      });

    }
  }
}

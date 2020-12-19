'use strict';

const User = require('../model/User');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/users',
  config: {

    handler: (req, res) => {

      User
        .find()
        .select('-password -pixkey -__v')
        .exec((err, users) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!users.length) {
            throw Boom.notFound('Sem usuarios');
          }
          res(users);
        })
    }
  }
}
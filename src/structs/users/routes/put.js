'use strict';

const bcrypt = require('bcryptjs');
const Boom = require('boom');
const User = require('../model/User');


module.exports = {
  method: 'PUT',
  path: '/users/{id}',
  config: {

    handler: (req, res) => {

      let data = req.payload;
      const id = req.params.id;

      User.findOneAndUpdate({ _id: id }, data, (err, user) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        if (!user) {
          throw Boom.notFound('Usuario nao achado');
        }
        res({ message: 'Usuario atualizado' });
      });
    }
  }
};
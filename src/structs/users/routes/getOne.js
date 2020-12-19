'use strict';

const User = require('../model/User');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/users/{id}',
  config: {
    

    handler: (req, res) => {
  
        var id = req.params.id;
      User
        .find({_id: id})
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
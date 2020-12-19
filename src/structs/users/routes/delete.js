'use strict';

const Boom = require('boom');
const User = require('../model/User');

module.exports = {
  method: 'DELETE',
  path: '/users/{id}',
  config: {

    handler: (req, res) => {
      const id = req.params.id;
      User
        .remove({ _id: id }, (err, x) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          res({message: 'Usuario Deletado'});
        });      
    }
  }
  
}
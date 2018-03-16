const jstoken = require('jsonwebtoken');
const Promise = require('bluebird');

const User = require('../models/user');
const { secret } = require('../config/environment');

function secureRoute(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).json({ message: 'Unauthorised'});
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  new Promise((resolve, reject) => {
    jstoken.verify(token, secret, (err, payload) => {
      if(err) reject(err);
      resolve(payload);
    });


  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if(!user) return res.status(401).json({ message: 'Unauthorised'});
      req.currentUser = user;
      next();
    })
    .catch(() => res.status(401).json({ message: 'Unauthorised'}));
}

module.exports = secureRoute;

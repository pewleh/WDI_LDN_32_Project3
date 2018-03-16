const User = require('../models/user');
const jtoken = require('jsonwebtoken');
const { secret } = require('../config/environment');
//{} instead of environment = require etc AND now you can call just secret insead of environment/secret.

function register(req, res, next){
  User.create(req.body)
    .then(user => {
      const token = jtoken.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      res.json({
        message: 'Thank you for registering',
        token
      });
    })
    .catch(next);
}

function login(req, res){
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).json({message: 'Unauthorised'});
      }
      const token = jtoken.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      res.json({
        message: `Welcome back ${user.username}!`,
        token
      });
    });
}

module.exports = {
  register,
  login
};

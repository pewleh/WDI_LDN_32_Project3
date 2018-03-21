const User = require('../models/user');
const jtoken = require('jsonwebtoken');
const { secret } = require('../config/environments');

function register(req, res, next){
  User.create(req.body)
    .then(user => {
      const token = jtoken.sign({ sub: user._id, admin: user.admin }, secret, { expiresIn: '24h'});
      res.json({
        message: 'Welcome home',
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
        id: user._id,
        admin: user.admin,
        token
      });
    });
}

module.exports = {
  register,
  login
};

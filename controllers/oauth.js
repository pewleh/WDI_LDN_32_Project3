const rp = require('request-promise');
const User = require('../models/user');
const jtoken = require('jsonwebtoken');
const { secret } = require('../config/environments');

function facebook(req, res, next) {

  rp({
    method: 'GET',
    url: 'https://graph.facebook.com/v2.12/oauth/access_token',
    qs: {
      client_id: req.body.clientId,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: req.body.redirectUri,
      code: req.body.code
    },
    json: true
  })
    .then(response => {
      return rp({
        method: 'GET',
        url: 'https://graph.facebook.com/me',
        qs: {
          fields: 'name,email,picture',
          access_token: response.access_token
        },
        json: true
      });
    })
    .then(profile => {
      return User.findOne({
        $or: [{ facebookId: profile.id }, { email: profile.email }]
      })
        .then(user => {
          if(!user) {
            user = new User({
              email: profile.email,
              username: profile.name
            });
          }

          user.facebookId = profile.id;
          return user.save();
        });
    })
    .then(user => {
      const token = jtoken.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      return res.json({
        message: `Welcome back ${user.username}!`,
        token
      });
    })
    .catch(next);
}

module.exports = {
  facebook
};

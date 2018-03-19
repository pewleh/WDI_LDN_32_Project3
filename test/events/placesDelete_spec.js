/* global api, describe, it, expect, beforeEach */

const Place = require('../../models/place');
const User = require('../../models/user');
const jtoken = require('jsonwebtoken');
const { secret } = require('../../config/environments');

let token;
let place;

const userData = {
  username: 'tester',
  email: 'tester@test.com',
  password: 'tester',
  passwordConfirmation: 'tester'
};

const placeData ={
  name: 'Greenwich Park',
  image: 'https://enbaca.com/web/assets/image-resources/avatar.png',
  type: 'Park',
  outdoor: true,
  location: 'Greenwich'
};

describe('DELETE /api/places/place._id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Place.remove({})
    ])
      .then(() => Place.create(placeData))
      .then(placeData => place = placeData)
      .then(() => User.create(userData))
      .then(user => {
        token = jtoken.sign({ sub: user._id }, secret, {expiresIn: '24h'});
      })
      .then(done);
  });

  it('should return a response of 204', done => {
    api
      .delete(`/api/places/${place._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});

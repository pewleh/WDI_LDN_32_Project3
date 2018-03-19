/* global api, describe, it, expect, beforeEach */

const Place = require('../../models/place');
const User = require('../../models/user');

const jtoken = require('jsonwebtoken');
const { secret } = require('../../config/environments');

let token;

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


describe('POST/places', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Place.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jtoken.sign({ sub: user._id }, secret, {expiresIn: '24h'});
      })
      .then(done);
  });

  it('should return response of 401 without a token', done => {
    api
      .post('/api/places')
      .send(placeData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a response of 201', done => {
    api
      .post('/api/places')
      .set('Authorization', `Bearer ${token}`)
      .send(placeData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
});

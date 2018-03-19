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

const placeData = {
  name: 'Greenwich Park',
  image: 'https://enbaca.com/web/assets/image-resources/avatar.png',
  type: 'Park',
  outdoor: true,
  address: 'Greenwich',
  location: {
    lat: 51.4769095,
    lng: 0.0014643
  }
};

const updatedPlaceData =   {
  name: 'This particular Park test',
  image: 'https://enbaca.com/web/assets/image-resources/avatar.png',
  type: 'Park',
  outdoor: true,
  address: 'Earth',
  location: {
    lat: 51.4769095,
    lng: 0.0014643
  }
};


describe('PUT /api/places/place._id', () => {
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

  it('should return a response of 200', done => {
    api
      .put(`/api/places/${place._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedPlaceData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a response of 401 without a token', done => {
    api
      .put(`/api/places/${place._id}`)
      .send(updatedPlaceData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});

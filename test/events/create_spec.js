/* global api, describe, it, expect, beforeEach */

const Event = require('../../models/event');
const User = require('../../models/user');

const { secret } = require('../../config/environments');
const jtoken = require('jsonwebtoken');
let token;

const userData = {
  username: 'tester',
  email: 'tester@test.com',
  password: 'tester',
  passwordConfirmation: 'tester'
};

const eventData = {
  name: 'ISS Flyover',
  date: '17/03/2018',
  startTime: '22:12',
  endTime: '22:16',
  type: 'Satellite',
  visibility: 'Naked Eye'
};


describe('POST/events', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Event.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jtoken.sign({ sub: user._id }, secret, {expiresIn: '24h'});
      })
      .then(done);
  });

  it('should return response of 401 without a token', done => {
    api
      .post('/api/events')
      .send(eventData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a response of 201', done => {
    api
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(eventData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
});

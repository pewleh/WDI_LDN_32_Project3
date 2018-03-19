/* global api, describe, it, expect, beforeEach */

const Event = require('../../models/event');
const User = require('../../models/user');
const jtoken = require('jsonwebtoken');
const { secret } = require('../../config/environments');

let token;
let event;


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

const updatedEventData = {
  name: 'ISS Flyover Recall',
  date: '20/05/2018',
  startTime: '23:12',
  endTime: '23:16',
  type: 'Satellite',
  visibility: 'Naked Eye'
};


describe('PUT /api/events/event._id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Event.remove({})
    ])
      .then(() => Event.create(eventData))
      .then(eventData => event = eventData)
      .then(() => User.create(userData))
      .then(user => {
        token = jtoken.sign({ sub: user._id }, secret, {expiresIn: '24h'});
      //.sign is the method that creates the token            //payload
      })
      .then(done);
  });

  it('should return a response of 200', done => {
    api
      .put(`/api/events/${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedEventData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a response of 401 without a token', done => {
    api
      .put(`/api/events/${event._id}`)
      .send(updatedEventData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });


});

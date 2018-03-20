/* global api, describe, it, expect, beforeEach */

const Event = require('../../models/event');

let event;

const eventData = {
  name: 'ISS Flyover',
  date: '17/03/2018',
  startTime: '22:12',
  endTime: '22:16',
  type: 'Satellite',
  visibility: 'Naked Eye'
};


describe('GET /api/events/event._id', () => {
  beforeEach(done => {
    Event.remove({})
      .then(() => Event.create(eventData))
      .then(eventData => event = eventData)
      .then(() => done());
  });

  it('should return response of 200', done => {
    api
      .get(`/api/events/${event._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});

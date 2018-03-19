/* global api, describe, it, expect, beforeEach */

const Event = require('../../models/event');

const eventData = {
  name: 'ISS Flyover',
  date: '17/03/2018',
  startTime: '22:12',
  endTime: '22:16',
  type: 'Satellite',
  visibility: 'Naked Eye'
};


describe('GET /events', () => {
  beforeEach(done => {
    Event.remove({})
      .then(() => Event.create(eventData))
      .then(() => done());
  });

  it('should return response of 200', done => {
    api
      .get('/api/events')
      .send(eventData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});

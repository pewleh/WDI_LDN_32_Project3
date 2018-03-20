/* global api, describe, it, expect, beforeEach */

const Place = require('../../models/place');

let place;

const placeData = {
  name: 'Greenwich Park',
  image: 'https://enbaca.com/web/assets/image-resources/avatar.png',
  type: 'Park',
  outdoor: true,
  location: 'Greenwich'
};

describe('GET /api/places/place._id', () => {
  beforeEach(done => {
    Place.remove({})
      .then(() => Place.create(placeData))
      .then(placeData => place = placeData)
      .then(() => done());
  });

  it('should return a response of 200', done => {
    api
      .get(`/api/places/${place._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});

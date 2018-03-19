/* global api, describe, it, expect, beforeEach */

const Place = require('../../models/place');

const placeData ={
  name: 'Greenwich Park',
  image: 'https://enbaca.com/web/assets/image-resources/avatar.png',
  type: 'Park',
  outdoor: true,
  location: 'Greenwich'
};


describe('GET /places', () => {
  beforeEach(done => {
    Place.remove({})
      .then(() => Place.create(placeData))
      .then(() => done());
  });

  it('should return response of 200', done => {
    api
      .get('/api/places')
      .send(placeData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});

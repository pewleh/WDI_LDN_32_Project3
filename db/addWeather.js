const Place = require('../models/place');
const rp = require('request-promise');
const Promise = require('bluebird');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { dbURI } = require('../config/environments');

mongoose.connect(dbURI);

Place.find()
  .then(places => {
    const promises = places.map(place => {
      return rp({
        url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${place.location.lat},${place.location.lng}`,
        qs: { units: 'si' },
        json: true
      })
        .then(response => {
          place.weather = response.daily;
          return place.save();
        });
    });

    return Promise.all(promises);
  })
  .then(() => console.log('Weather added!'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

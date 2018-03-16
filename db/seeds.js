const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environments');
const Asteroid = require('../models/asteroid');
const dataRequests = require('../lib/dataRequests');
const rp = require('request-promise');

mongoose.connect(dbURI, (err, db) => {
  let asteroids = null;

  function neoAsteroids(req, res, next) {
    // const endpoint = 'https://api.nasa.gov/neo/rest/v1/feed?';
    // const apiKey = process.env.NASA_API_KEY;
    // const date = '2018-03-19';

    rp({
      url: 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2018-03-19&api_key=DEMO_KEY'
    })
      .then(response => {
        // console.log(response );
        asteroids = response;
        console.log(asteroids.near_earth_objects);
        // console.log(response['near_earth_objects']);
        // console.log(response.near_earth_objects[0]);
      })
      // .then(() => console.log(asteroids))
      .catch(next);
  }



  db.dropDatabase()
    // .then(() => console.log(dataRequests.neoAsteroids()))
    .then(() => asteroids = neoAsteroids())
    // .then(() => console.log(asteroids))
    .finally(() => mongoose.connection.close());

  // Asteroid.create(dataRequests.neoAsteroids)
  //   .then(asteroids => console.log(`${asteroids.length} places created`))
  //   .catch(err => console.log(err))
  //   .finally(() => mongoose.connection.close());

  // Feels like this should work
  //     .then(() => console.log(dataRequests.neoAsteroids()))
  // .finally(() => mongoose.connection.close());
});

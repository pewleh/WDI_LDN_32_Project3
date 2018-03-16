const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environments');
const Event = require('../models/event');
// const dataRequests = require('../lib/dataRequests');

const rp = require('request-promise');
const allEvents = [];
let asteroids = null;
let datesQueried = null;

mongoose.connect(dbURI, (err, db) => {

  db.dropDatabase()
    // .then(() => console.log(dataRequests.neoAsteroids()))
    .then(() => console.log('connected to db'))
    .then(() => {
      return rp({
        url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=2018-03-19&api_key=${process.env.NASA_API_KEY}`,
        json: true
      })
        .then(response => {
          asteroids = response;  // all data
          datesQueried = Object.keys(asteroids.near_earth_objects).sort(); // this gives us the dates and sorts them

          datesQueried.forEach( (date, index) => {
            // this creates an array of objects where each object is one days events
            const daysEvents = Object.values(asteroids.near_earth_objects)[index];

            // this turns each event into an object that we can push into the DB
            daysEvents.forEach((event) => {
              // This assigns each event within that array its matching date
              event.date = event.close_approach_data[0].close_approach_date;
              event.missDistance = event.close_approach_data[0].miss_distance.kilometers;
              event.visibility = 'telescope';
              event.type = 'Asteroid';
              allEvents.push(event);
            });
          });
        });
    })
    .then(() => Event.create(allEvents))
    .then(events => console.log(`${events.length}`))
    .finally(() => mongoose.connection.close());




  // .then(() => console.log(asteroids))


  // Asteroid.create(dataRequests.neoAsteroids)
  //   .then(asteroids => console.log(`${asteroids.length} places created`))
  //   .catch(err => console.log(err))
  //   .finally(() => mongoose.connection.close());

  // Feels like this should work
  //     .then(() => console.log(dataRequests.neoAsteroids()))
  // .finally(() => mongoose.connection.close());
});

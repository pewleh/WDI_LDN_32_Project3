const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environments');


const Event = require('../models/event');
const eventData = require('./data/events');

const Place = require('../models/place');
const placeData = require('./data/places');

const User = require('../models/User');
const userData = require('./data/users');
// const dataRequests = require('../lib/dataRequests');

const rp = require('request-promise');

const allEvents = [];
let asteroids = null;
let datesQueried = null;
let satellites = null;
const satellitesClean = [];


mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase()
  // .then(() => console.log(dataRequests.neoAsteroids()))
    .then(console.log('connected to db and cleared it'))
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
    .then(events => console.log(`${events.length} Asteroids Created`))
    .then(() => {
      return rp({
        url: 'https://api.satellites.calum.org/rest/v1/multi/next-pass?lat=51.51794662&lon=-0.0749192&alt=0',
        json: true,
        method: 'POST',
        body: {'norad-ids': ['25544','27607','39444','24278','40909']}
      })
        .then(response => {
          satellites = response;  // all data

          satellites.passes.forEach(satellite => {
            satellite.date = satellite.start; // This needs to be fixed
            satellite.startTime = satellite.start;
            satellite.endTime = satellite.end;
            satellite.type = 'Satellite';
            satellite.visibility = 'Naked Eye';
            satellitesClean.push(satellite);
          });
        });
    })
    .then(() => Event.create(satellitesClean))
    .then((events) => console.log(`${events.length} Satellites created`))
    .then(() => Event.create(eventData))
    .then(events => console.log(`${events.length} events created`))
    .catch(err => console.log(err))
    .then(() => Place.create(placeData))
    .then(places => console.log(`${places.length} places created`))
    .catch(err => console.log(err))
    .then(() => User.create(userData))
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});

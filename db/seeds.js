const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const Event = require('../models/event');
const eventData = require('./data/events');

const Location = require('../models/location');
const locationData = require('./data/locations');

const User = require('../models/User');
const userData = require('./data/users');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Event.create(eventData)
    .then(events => console.log(`${events.length} events created`))
    .catch(err => console.log(err))
    .then(() => Location.create(locationData))
    .then(locations => console.log(`${locations.length} locations created`))
    .catch(err => console.log(err))
    .then(() => User.create(userData))
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Event = require('../models/event');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Event.create([{
    test: 'word'
  },{
    test: 'another word'
  }])
    .then(events => console.log(`${events.length} events created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});

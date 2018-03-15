const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  test: {type: String}
});

module.exports = mongoose.model('Event', eventSchema);

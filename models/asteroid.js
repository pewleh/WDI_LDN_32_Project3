const mongoose = require('mongoose');

const asteroidSchema = new mongoose.Schema({
  test: {type: String}
});

module.exports = mongoose.model('Asteroid', asteroidSchema);

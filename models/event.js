const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  rating: { type: Number, min: 0, max: 5, required: true }, //Do events need Ratings?
  content: {type: String},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  approved: { type: Boolean, default: false }
});

const eventSchema = new mongoose.Schema({
  name: {type: String, minlength: 2, required: true},
  date: {type: String, minlength: 2, required: true},
  startTime: {type: String, minlength: 2},
  endTime: {type: String, minlength: 2},
  type: {type: String, minlength: 2, required: true}, // limit options
  visibility: {type: String, minlength: 2, required: true},
  location: {type: String, minlength: 2}, // Only necessary for events at specific locations (maybe planetariums?)
  attending: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: [commentSchema],
  userImages: [{ content: String }]
});

// Should we make the placeholder image a virtual so it can pull itself from a selection of images?

module.exports = mongoose.model('Event', eventSchema);

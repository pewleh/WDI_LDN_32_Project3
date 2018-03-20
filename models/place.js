const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  approved: { type: Boolean, default: false }
});

const placeSchema = new mongoose.Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  address: { type: String },
  description: {type: String},
  name: {type: String, minlength: 2, required: true},
  image: {type: String, minlength: 2 }, // needs a pattern, also needs required: true
  type: {type: String, minlength: 2, required: true}, // Park/observatory/National Trust
  openingTime: {type: String },
  closingTime: {type: String }, // <- If we use these and leave them blank, are they gonna look weird on the SHOW page?
  outdoor: {type: Boolean}, // Do we need this if we have type <-
  weather: {},
  comments: [commentSchema],
  userImages: [{ content: String }]
});

placeSchema.virtual('averageRating')
  .get(function calculateRating() {
    let currentRating = 0;
    this.comments.forEach(comment => {
      currentRating += comment.rating;
    });
    currentRating = currentRating / (this.comments.length);
    return currentRating.toFixed(1);
  });

// Make Weather a virtual?
// Make a middleware function and pass it the location from the schema
// Function should pull weather for next 5 days from darksky and display it
// Maybe pull some data from other APIs, such as Moon phases?


module.exports = mongoose.model('Place', placeSchema);

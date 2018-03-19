const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const messageSchema = new mongoose.Schema({
  content: {type: String},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  sent: { type: Boolean }, // Could also deal with this on the display page
  approved: { type: Boolean, default: false }
});

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, default: 'https://enbaca.com/web/assets/image-resources/avatar.png'},
  admin: { type: Boolean },
  email: { type: String, required: true, unique: true }, // needs a pattern!
  password: { type: String, required: true },
  favoriteEvents: [{ type: mongoose.Schema.ObjectId, ref: 'Event'}],
  favoriteLocations: [{ type: mongoose.Schema.ObjectId, ref: 'Location'}],
  messages: [messageSchema]
});

// Add the virtual for passwordConfirmation
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

//pre-validate hook ->
schema.pre('validate', function checkPassword(next) {
//password modification validation ->
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

schema.pre('save', function hashPassword(next) {
//rehash modified password ->
  if(this.isModified('password')) {
    //store hashed bcrypt password and add to user object ->
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// compareSync to compare plain text to hash ->
schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);

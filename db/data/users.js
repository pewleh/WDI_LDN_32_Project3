const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});


//password confirmarions:
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmtation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });
//passwords dont match ->
userSchema.pre('validate', function checkPasswordMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'The passwords do not match');
  }
  next();
});
//protection against hackin ->
userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

//validation of hashed password ->
userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

module.exports = [
  {
    username: 'monsagri',
    avatar: 'https://enbaca.com/web/assets/image-resources/avatar.png',
    admin: true,
    email: 'feldbergf@gmail.com',
    password: 'AdminPass',
    passwordConfirmation: 'AdminPass'
  },
  {
    username: 'pewleh',
    avatar: 'https://enbaca.com/web/assets/image-resources/avatar.png',
    admin: true,
    email: 'pewlehh@gmail.com',
    password: 'AdminPass',
    passwordConfirmation: 'AdminPass'
  },
  {
    username: 'helsybayor',
    avatar: 'https://enbaca.com/web/assets/image-resources/avatar.png',
    admin: true,
    email: 'helsz@hotmail.co.uk',
    password: 'AdminPass',
    passwordConfirmation: 'AdminPass'
  }
];

//

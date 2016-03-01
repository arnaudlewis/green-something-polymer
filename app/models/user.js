'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userCollection = 'users';
const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}/*,
  firstname: {type: String, required: false},
  lastname: {type: String, required: false},
  email: {type: String, required: false},
  birthday: {type: Date, required: false},
  creationDate: {type: Date, default: Date.now, required: false},
  driverPreferences: {
    animal: {type: Boolean, required: false},
    smoke: {type: Boolean, required: false},
    withMusic: {type: Boolean, required: false}
  },
  travellerPreferences: {
    animal: {type: Boolean, required: false},
    smoke: {type: Boolean, required: false},
    withMusic: {type: Boolean, required: false}
  },
  sex: {type: Boolean, required: false},
  hobby: {type: String, required: false},
  music: {type: String, required: false},
  moreInfo: {type: String, required: false}*/
});

const userModel = mongoose.model('user',userSchema,userCollection);

var isValid = (p) => p !== undefined && p !== null && p.trim() !== '';

var User = function(username, password) {
  this.defined = isValid(username) && isValid(password)
  if(this.defined) {
    this.username = username;
    this.password = password;
  }
}

User.prototype.isDefined = function () { return this.defined; }
User.prototype.toJson = function () { return this.defined 
  ? { 
    'username': this.username,
    'password': this.password/*,
    'firstname': this.firstname,
    'lastname': this.lastname,
    'email': this.email,
    'birthday': this.birthday,
    'creationDate': this.date,
    'driverPreferences': {
      'animal': this.animalDriver,
      'smoke': this.smokeDriver,
      'withMusic': this.withMusicDriver
    },
    'travellerPreferences': {
      'animal': this.animalTraveller,
      'smoke': this.smokeTraveller,
      'withMusic': this.withMusicTraveller
    },
    'sex': this.sex,
    'hobby': this.hobby,
    'music': this.music,
    'moreInfo': this.moreInfo*/
  } 
  : {}; 
}
User.prototype.model = function () { return new userModel(this.toJson()); }

module.exports = User;
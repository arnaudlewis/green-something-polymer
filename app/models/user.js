'use strict';

var mongoose = require('mongoose');
var model = require('../const/UserConst').model;


let isValid = (p) => p !== undefined && p !== null && p.trim() !== '';

var User = function(id, username, password) {
  this.defined = isValid(username) && isValid(password)
  if(this.defined) {
    this.id = id || mongoose.Types.ObjectId()
    this.username = username;
    this.password = password;
  }
}
User.prototype.isDefined = function () { return this.defined; }
User.prototype.toJson = function () { return this.defined ? { 'id': this.id, 'username': this.username, 'password': this.password } : {}; }
User.prototype.model = function () { return new model(this.toJson()); }

module.exports = User
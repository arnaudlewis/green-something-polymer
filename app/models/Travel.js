'use strict';

var mongoose = require('mongoose');
var model = require('../const/TravelsConst').model;


let isValid = (p) => p !== undefined && p !== null && p.trim() !== '';

var Travel = function(id, departure, arrival) {
  this.defined = isValid(departure) && isValid(arrival)
  if(this.defined) {
    this.id = id || mongoose.Types.ObjectId()
    this.departure = departure;
    this.arrival = arrival;
  }
}
Travel.prototype.isDefined = function () { return this.defined; }
Travel.prototype.toJson = function () { return this.defined ? { 'id': this.id, 'departure': this.departure, 'arrival': this.arrival } : {}; }
Travel.prototype.model = function () { return new model(this.toJson()); }

module.exports = Travel
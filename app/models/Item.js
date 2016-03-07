'use strict';

var mongoose = require('mongoose');
var model = require('../const/ItemsConst').model;


let isValid = (p) => p !== undefined && p !== null && p.trim() !== '';

var Item = function(id, key, value) {
  this.defined = isValid(key) && isValid(value)
  if(this.defined) {
    this.id = id || mongoose.Types.ObjectId()
    this.key = key;
    this.value = value;
  }
}
Item.prototype.isDefined = function () { return this.defined; }
Item.prototype.toJson = function () { return this.defined ? { 'id': this.id, 'key': this.key, 'value': this.value } : {}; }
Item.prototype.model = function () { return new model(this.toJson()); }

module.exports = Item

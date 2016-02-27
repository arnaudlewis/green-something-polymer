'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const itemCollection = 'items';
const schema = new Schema({
  key: {type: String, required: true},
  value: {type: String, required: true}
});
const model = mongoose.model('model', schema, itemCollection);

let isValid = (p) => p !== undefined && p !== null && p.trim() !== '';

let Item = function(key, value) {
  this.defined = isValid(key) && isValid(value)
  if(this.defined) {
    this.key = key;
    this.value = value;
  }
}
Item.prototype.isDefined = function () { return this.defined; }
Item.prototype.toJson = function () { return this.defined ? { 'key': this.key, 'value': this.value } : {}; }
Item.prototype.model = function () { return new model(this.toJson()); }

module.exports = Item;

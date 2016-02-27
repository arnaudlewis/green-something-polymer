'use strict';

let Item = function(key, value) {
  this.key = key;
  this.value = value;
}
Item.prototype.getKey = function () { return this.key; }
Item.prototype.getValue = function () { return this.value; }
Item.prototype.toJson = function () { return { 'key': this.key, 'value': this.value }; }
module.exports = Item;

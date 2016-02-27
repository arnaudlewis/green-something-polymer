'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const itemCollection = 'items';
const schema = new Schema({
  key: {type: String, required: true},
  value: {type: String, required: true}
});
const model = mongoose.model('model', schema, itemCollection);


let Item = function(key, value) {
  this.key = key;
  this.value = value;
}
Item.prototype.getKey = function () { return this.key; }
Item.prototype.getValue = function () { return this.value; }
Item.prototype.toJson = function () { return { 'key': this.key, 'value': this.value }; }

Item.prototype.save = function () {  
    return new model(this.toJson()).save();  
}


module.exports = Item;

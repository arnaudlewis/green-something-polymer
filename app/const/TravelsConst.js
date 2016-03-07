var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  departure: {type: String, required: true},
  arrival: {type: String, required: true},
  driver: {type: String, required: true},
  price: {type: Number, required: true}
});
var travelCollection = 'travels';

module.exports = {
  model: mongoose.model('travelModel', schema, travelCollection)
}
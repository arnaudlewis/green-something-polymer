var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  departure: {type: String, required: true},
  arrival: {type: String, required: true}
});
var travelCollection = 'travels';

module.exports = {
  model: mongoose.model('travelModel', schema, travelCollection)
}
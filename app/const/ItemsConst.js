var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  key: {type: String, required: true},
  value: {type: String, required: true}
});
var itemCollection = 'items';

module.exports = {
  model: mongoose.model('itemModel', schema, itemCollection)
}

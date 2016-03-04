var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
});
var userCollection = 'users';

module.exports = {
  model: mongoose.model('userModel', schema, userCollection)
}
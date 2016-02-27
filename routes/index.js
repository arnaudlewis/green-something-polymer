'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../app/models/Item');

/* GET home page. */

function generateRange(length) {
  return length ? Array.apply(null, {'length': length}).map(Number.call, Number) : [];
}

function toJsonArray(items) {
  return items.map((i, index) => i.toJson());
}

router.get('/', function(req, res, next) {
  let items = generateRange(10).map((item, index) => new Item('hello' + index, 'hello world'));
  res.send(toJsonArray(items));
});

module.exports = router;

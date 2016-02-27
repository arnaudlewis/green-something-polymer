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

router.post('/add', function(req,res,next){
  new Item(req.body.key,req.body.val).save().then(
    () => res.end,
    (err) => res.status(501).send("error")
  )
});

module.exports = router;

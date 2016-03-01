'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../app/models/Item');
var User = require('../app/models/user');

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
  let item = new Item(req.body.key,req.body.val)
  if(!item.isDefined()) res.status(501).send("Missing imformations !")
  item.model().save().then(
    () => res.end(),
    (err) => res.status(501).send("error")
  )
});

router.post('/adduser', function(req,res,next){
  let user = new User(req.body.username,req.body.password)
  if(!user.isDefined()) res.status(501).send("Missing imformations !")
  user.model().save().then(
    () => res.end(),
    (err) => res.status(501).send("error")
  )
});

module.exports = router;

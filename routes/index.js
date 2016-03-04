'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../app/models/Item');
var Items = require('../app/collections/Items');




/* GET home page. */

router.get('/', function(req, res, next) {
  Items.get()
    .then((docs) => {
      res.send(Items.toArray(docs))
    })
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

router.post('/add', function(req,res,next){
  let item = new Item(req.body.key,req.body.val)
  if(!item.isDefined()) res.status(501).send("Missing imformations !")
  item.model().save().then(
    () => res.end(),
    (err) => res.status(501).send("error")
  )
});



module.exports = router;

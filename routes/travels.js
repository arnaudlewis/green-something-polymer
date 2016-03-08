'use strict';

var express = require('express');
var router = express.Router();

var utils = require('../utils/utils.js');

var Travel = require('../app/models/travel');
var Travels = require('../app/collections/Travels');


router.get('/', function(req, res, next) {
  Travels.get()
    .then((docs) => {
      res.send(Travels.toArray(docs))
    })
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

router.post('/findbyid', function(req, res, next) {
  Travels.byId(req.body.id)
    .then((travel) => {
      res.send(travel)
    })
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

//the following middleware apply only to the following routes
router.use(utils.verifyToken);

router.post('/add', function(req,res,next){
  let travel = new Travel(req.body.id,req.body.departure,req.body.arrival,req.body.driver,req.body.price)
  if(!travel.isDefined()) res.status(501).send("Missing imformations !")
  travel.model().save().then(
    () => res.end(),
    (err) => res.status(501).send("error")
  )
});

router.put('/update', function(req, res, next) {
  Travels.update(req.body.id,req.body)
    .then((travel) => res.status(200).send(travel))
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

router.delete('/remove', function(req, res, next) {
  Travels.remove(req.body.id)
    .then(() => res.status(204).send("travel deleted"))
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

module.exports = router;
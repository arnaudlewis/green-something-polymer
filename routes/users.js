'use strict';

var express = require('express');
var router = express.Router();

var User = require('../app/models/user');
var Users = require('../app/collections/Users');


router.get('/', function(req, res, next) {
  Users.get()
    .then((docs) => {
      res.send(Users.toArray(docs))
    })
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

router.post('/findbyid', function(req, res, next) {
  Users.byId(req.body.id)
    .then((user) => {
      res.send(user)
    })
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

router.post('/add', function(req,res,next){
  let user = new User(req.body.id,req.body.username,req.body.password)
  if(!user.isDefined()) res.status(501).send("Missing imformations !")
  user.model().save().then(
    () => res.end(),
    (err) => res.status(501).send("error")
  )
});

router.put('/update', function(req, res, next) {
  Users.update(req.body.id, req.body)
    .then((user) => res.status(200).send(user))
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

router.delete('/remove', function(req, res, next) {
  Users.remove(req.body.id, req.body.username, req.body.password)
    .then(() => res.status(204).send("user deleted"))
    .catch((errs) => {
      console.log(errs)
      res.end()
    })
});

module.exports = router;
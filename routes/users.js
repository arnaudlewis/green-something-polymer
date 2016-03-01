'use strict';

var express = require('express');
var router = express.Router();

var User = require('../app/models/user');


router.post('/add', function(req,res,next){
  let user = new User(req.body.username,req.body.password)
  if(!user.isDefined()) res.status(501).send("Missing imformations !")
  user.model().save().then(
    () => res.end(),
    (err) => res.status(501).send("error")
  )
});

/*router.get('/find', function(req,res,next){
  let user = new User()
  if(!user.isDefined()) 
  user.model().find({}, function (err, users) {
        if (!err) {
            res.send(users);
        } else {
            res.status(501).send("no user found");
        }
    }).select('-__v');
});*/

module.exports = router;
'use strict';

var model = require('../const/UsersConst').model;
var User = require('../models/User');

var Users = {

  get(query, fields){
    return new Promise((resolve, reject) => {
        model.find(query || {},fields || {}, (err, docs) => {
          if (err) reject(err)
          else resolve(this.toUsers(docs))
        })
      })
  },

  byId(id){
    return new Promise((resolve, reject) => {
      model.findById(id, (err, user) => {
        if (err) reject(err)
        else resolve(new User(user._id,user.username,user.password))
      })
    })
  },

  update(id){
    return new Promise((resolve, reject) => {
      model.findByIdAndUpdate(id, (err,user) => {
        if (err) reject(err)
        else resolve(user)
      })
    })
  },

  remove(id){
    return new Promise((resolve, reject) => {
      model.findByIdAndRemove(id, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  },

  toArray(items) {
    return items.map((i, index) => i.toJson())
  },

  toUsers(docs) {
    return docs.map(d => new User(d._id, d.username, d.password))
  }
}


module.exports = Users;
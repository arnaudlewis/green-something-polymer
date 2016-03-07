'use strict';

var model = require('../const/TravelsConst').model;
var Travel = require('../models/Travel');

var Travels = {

  get(query, fields){
    return new Promise((resolve, reject) => {
        model.find(query || {},fields || {}, (err, docs) => {
          if (err) reject(err)
          else resolve(this.toTravels(docs))
        })
      })
  },

  byId(id){
    return new Promise((resolve, reject) => {
      model.findById(id, (err, travel) => {
        if (err) reject(err)
        else resolve(new Travel(travel._id,travel.departure,travel.arrival, travel.driver, travel.price))
      })
    })
  },

  update(id,newTravel){
    return new Promise((resolve, reject) => {
      model.findByIdAndUpdate(id,newTravel, (err,travel) => {
        if (err) reject(err)
        else resolve(travel)
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

  toArray(travels) {
    return travels.map((i, index) => i.toJson())
  },

  toTravels(docs) {
    return docs.map(d => new Travel(d._id, d.departure, d.arrival, d.driver, d.price))
  }
}


module.exports = Travels;
'use strict';

var model = require('../const/ItemsConst').model;
var Item = require('../models/Item');

var Items = {
  get(query, fields) {
    return new Promise((resolve, reject) => {
      model.find(query || {}, fields || {}, (errs, docs) => {
        if(errs) reject(errs)
        else resolve(this.toItems(docs))
      })
    })
  },

  one(query, fields) {
    return new Promise((resolve, reject) => {
      model.findOne(query || {}, fields || {}, (errs, doc) => {
        if(errs) reject(errs)
        else resolve(new Item(doc._id, doc.key, doc.value))
      })
    })
  },

  byId(obj) {
    return new Promise((resolve, reject) => {
      model.findById(obj._id, fields || {}, (errs, doc) => {
        if(errs) reject(errs)
        else resolve(new Item(doc._id, doc.key, doc.value))
      })
    })
  },

  toArray(items) {
    return items.map((i, index) => i.toJson())
  },

  toItems(docs) {
    return docs.map(d => new Item(d._id, d.key, d.value))
  }
}

module.exports = Items

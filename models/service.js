'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const serviceSchema = new Schema({
  name: String,
  category: {type: String, enum: ['Education', 'Teconolgy', 'Health Care']},
  //  solo pones [] pq es array
  provider: [{
    type: ObjectId,
    // UWU no estoy segura de si ref es services
    ref: 'Services'
  }],
  price: {
    amount: Number,
    unit: {type: String, enum: ['/hour', '/day', '/month']}

  }
});

const User = mongoose.model('Service', serviceSchema);

module.exports = User;

// teniendo los modelos hechos puedo empezar con las views.

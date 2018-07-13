'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const serviceSchema = new Schema({
  name: {type: String, required: true},
  category: {type: String, enum: ['Education', 'Teconolgy', 'Health Care', 'Transportation', 'Social services', 'Maintenance', 'Business', 'Tourism', 'Others'], required: true},
  //  solo pones [] pq es array
  provider: [{
    type: ObjectId,
    // UWU no estoy segura de si ref es services
    ref: 'Service'
  }],
  price: {
    amount: Number,
    unit: {type: String, enum: ['/hour', '/day', '/month']},
    required: true
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

// teniendo los modelos hechos puedo empezar con las views.

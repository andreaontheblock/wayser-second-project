'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const serviceSchema = new Schema({
  name: {type: String, required: true},
  category: {type: String, enum: ['Education', 'Teconolgy', 'Health Care', 'Transportation', 'Social services', 'Maintenance', 'Business', 'Tourism', 'Others'], required: true},

  provider: {type: ObjectId, ref: 'Service'},
  // UWU no estoy segura de si ref es services

  price: {
    amount: {type: String, required: true},
    unit: {
      type: String,
      enum: ['hour', 'day', 'week', 'month', 'year', 'lesson'],
      required: true
    }
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

// teniendo los modelos hechos puedo empezar con las views.

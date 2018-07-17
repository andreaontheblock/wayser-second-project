'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }
});

// estamos creando TEMPLATES NO creando en sí. Movie con mayuscula pq es como si fuese un constructor
const User = mongoose.model('User', userSchema);

module.exports = User;

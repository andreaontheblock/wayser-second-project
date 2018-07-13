'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String
});

// estamos creando TEMPLATES NO creando en sí. Movie con mayuscula pq es como si fuese un constructor
const User = mongoose.model('User', userSchema);

module.exports = User;

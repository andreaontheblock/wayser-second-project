'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:category', function (req, res, next) {
  const serviceCategory = req.params.category;

  Service.find; // UWU buscar users by category e.g. 'technology'

  res.render('services-category');
});

module.exports = router;

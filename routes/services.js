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
  let correctServiceCategory = serviceCategory.charAt(0).toUpperCase() + serviceCategory.substr(1); // UWU SUPER GREAT CODE IN ONE FUKIN LINE!!
  if (correctServiceCategory.includes('-')) {
    correctServiceCategory = correctServiceCategory.replace(/-/, ' ');
    let array = correctServiceCategory.split(' ');
    let arrayUpperCased = array[1].charAt(0).toUpperCase() + array[1].substr(1);
    array[1] = arrayUpperCased;
    correctServiceCategory = array.join(' ');
  }

  Service.find({category: correctServiceCategory}).populate('provider') // UWU buscar users by category e.g. 'technology'
    .then((services) => {
      res.render('services-category', {services: services});
    })
    .catch(next);
});

module.exports = router;

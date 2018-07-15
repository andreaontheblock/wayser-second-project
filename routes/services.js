'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const filter = {};

  if (req.query.cat) {
    // @todo if (invalid category) { return next() }
    const serviceCategory = req.query.cat;
    let correctServiceCategory = serviceCategory.charAt(0).toUpperCase() + serviceCategory.substr(1); // UWU SUPER GREAT CODE IN ONE FUKIN LINE!!
    // @todo refactor
    if (correctServiceCategory.includes('-')) {
      correctServiceCategory = correctServiceCategory.replace(/-/, ' ');
      let array = correctServiceCategory.split(' ');
      let arrayUpperCased = array[1].charAt(0).toUpperCase() + array[1].substr(1);
      array[1] = arrayUpperCased;
      correctServiceCategory = array.join(' ');
    }
    filter.category = correctServiceCategory;
  }

  if (req.query.terms) {
    filter.name = {
      $regex: new RegExp(req.query.terms),
      $options: 'i'
    };
  }

  Service.find(filter).populate('provider')
    .then((services) => {
      console.log(services, 'hello');
      res.render('services-category', {services: services});
    })
    .catch(next);
});

module.exports = router;

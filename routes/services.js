'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const filter = {};
  const predefinedCategories = ['education', 'technology', 'health-care', 'transportation', 'social-services', 'maintenance', 'business', 'tourism', 'others'];
  if (req.query.cat) {
    if (predefinedCategories.find(item => item === req.query.cat)) {
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
    } else {
      res.render('search-not-found');
      return;
    }
  }

  if (req.query.terms) {
    filter.name = {
      $regex: new RegExp(req.query.terms),
      $options: 'i'
    };
  }

  Service.find(filter).populate('provider')
    .then((services) => {
      res.render('services-category', {services: services});
    })
    .catch(next);
});

router.get('/:serviceId', (req, res, next) => {
  const serviceId = req.params.serviceId;
  Service.findById(serviceId)
    .then((service) => {
      res.render('service-details', {service: service});
    })
    .catch(next);
});

module.exports = router;

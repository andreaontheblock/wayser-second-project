'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const criteria = {};
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
    criteria.category = correctServiceCategory;
  }

  if (req.query.terms) {
    // @todo google query mongoose string contains
    criteria = {name: req.query.terms};
  }

  Service.find(criteria).populate('provider') // UWU buscar users by category e.g. 'technology'
    .then((services) => {
      res.render('services-category', {services: services});
    })
    .catch(next);
});

module.exports = router;

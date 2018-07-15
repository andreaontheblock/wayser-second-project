'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');

/* GET users listing. */
router.get('/', function (req, res, next) {
  let criteria = '';

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
    criteria = correctServiceCategory;

    Service.find({category: criteria}).populate('provider')
      .then((services) => {
        res.render('services-category', {services: services});
      })
      .catch(next);

    return;
  }

  if (req.query.terms) {
    criteria = req.query.terms;
    Service.find({name: new RegExp(criteria)}).populate('provider');
    console.log('yeah')
      .then((services) => {
        res.render('services-category', {services: services});
      })
      .catch(next);
  }
});

module.exports = router;

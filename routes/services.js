'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');
const isIdValid = require('../middlewares/isIdValid');

/* GET users listings */
router.get('/', function (req, res, next) {
  const filter = {};
  const predefinedCategories = ['education', 'technology', 'transportation', 'social-services', 'maintenance', 'business', 'tourism', 'others'];

  if (req.query.cat) {
    if (predefinedCategories.find(item => item === req.query.cat)) {
      var isCat = req.query.cat;
      filter.category = {
        $regex: new RegExp(req.query.cat.substr(1, 5)),
        $options: 'i'
      };
    } else {
      return (next());
    }
  }

  if (req.query.terms) {
    var isTerms = req.query.terms;
    filter.name = {
      $regex: new RegExp(req.query.terms),
      $options: 'i'
    };
  }

  const queryStatus = {
    isCat: isCat,
    isTerms: isTerms
  };

  let sortSchema = {
    sort: '',
    key: ''
  };

  if (req.query.sort) {
    switch (req.query.sort) {
    case ('name-asc'):
      sortSchema.sort = 1;
      sortSchema.key = 'name';
      queryStatus.isSortByNameAsc = true;
      break;
    case ('name-desc'):
      sortSchema.sort = -1;
      sortSchema.key = 'name';
      queryStatus.isSortByNameDesc = true;
      break;
    case ('price-asc'):
      sortSchema.sort = 1;
      sortSchema.key = 'price.amount';
      queryStatus.isSortByPriceAsc = true;
      break;
    case ('price-desc'):
      sortSchema.sort = -1;
      sortSchema.key = 'price.amount';
      queryStatus.isSortByPriceDesc = true;
      break;
    }
  } else {
    sortSchema.sort = 1;
    sortSchema.key = 'name';
  }
  const sort = {};
  sort[sortSchema.key] = sortSchema.sort; // Creates an object whose key is 'name'

  Service.find(filter).populate('provider').sort(sort)
    .then((services) => {
      if (services.length === 0) {
        res.status(404);
        res.render('not-found');
        return next;
      }

      res.render('services-category', {services: services, queryStatus: queryStatus});
    })
    .catch(next);
});

router.get('/:serviceId', isIdValid, (req, res, next) => {
  if (!req.session.currentUser) {
    req.session.lastURL = req.header('Referer').split('/')[3];
    req.session.counter = 1;
    res.render('auth/signup');
    return;
  }

  const serviceId = req.params.serviceId;
  Service.findById(serviceId).populate('provider')
    .then((service) => {
      if (!service) {
        return next();
      }
      res.render('service-details', {service: service});
    })
    .catch(next);
});

module.exports = router;

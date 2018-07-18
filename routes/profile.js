'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');

/* GET home page. */
router.get('/', isUserLoggedIn, (req, res, next) => {
  const userId = {
    provider: req.session.currentUser._id
  };

  Service.find(userId).populate('provider')
    .then((service) => {
      res.render('profile', {service: service});
    })
    .catch(next);
});

router.get('/create-service', isUserLoggedIn, (req, res, next) => {
  res.render('create-service');
});

router.post('/create-service', isUserLoggedIn, (req, res, next) => {
  console.log(req.body);

  const newService = new Service({
    name: req.body.job,
    category: req.body.category,
    provider: req.session.currentUser._id,
    price: {
      amount: req.body.priceNumber,
      unit: req.body.priceText
    },
    description: req.body.description
  });

  newService.save()
    .then(() => {
      res.redirect('/profile');
    })
    .catch(next);
});

router.get('/edit/:serviceId', isUserLoggedIn, (req, res, next) => {
  Service.findById(req.params.serviceId).populate('provider')
    .then((service) => {
      res.render('edit-service', {service: service});
    })
    .catch(next);
});

// is info required to create a service??
// projections
router.post('/edit-service/:serviceId', isUserLoggedIn, (req, res, next) => {
  const data = {
    name: req.body.job,
    category: req.body.category,
    price: {
      amount: req.body.priceNumber,
      unit: req.body.priceText
    },
    description: req.body.description
  };

  Service.findByIdAndUpdate(req.params.serviceId, {
    name: data.name,
    category: data.category,
    price: {
      amount: data.price.amount,
      unit: data.price.unit
    },
    description: data.description
  }).populate('provider')
    .then(() => {
      res.redirect('/profile');
    })
    .catch(next);
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');

/* GET home page. */
router.get('/', isUserLoggedIn, (req, res, next) => {
  // const currentUser = req.session.currentUser;
  const userId = {
    provider: req.session.currentUser._id
  };
  Service.find(userId).populate('provider')
    .then((service) => {
      res.render('profile', {service: service});
    })
    .catch(next);
  // res.render('profile', {currentUser: currentUser});
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

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const Service = require('../models/service');

/* GET home page. */
router.get('/', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser) {
    res.redirect('/');
    return;
  }
  res.render('profile', {currentUser: currentUser});
});

router.get('/create-service', (req, res, next) => {
  res.render('create-service');
});

router.post('/create-service', (req, res, next) => {
  console.log(req.body);

  const newService = new Service({
    name: req.body.job,
    category: req.body.category,
    provider: req.session.currentUser._id,
    price: {
      amount: req.body.priceNumber,
      unit: req.body.priceText
    }
  });

  newService.save()
    .then(() => {
      res.redirect('/profile');
    })
    .catch(next);
});

module.exports = router;

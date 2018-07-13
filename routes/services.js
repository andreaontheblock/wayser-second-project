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
  let correctServiceCategory = '';
  for (var i = 0; i < serviceCategory.length; i++) { // UWU proceso explicar Andrea
    if (i === 0) {
      correctServiceCategory += serviceCategory[i].toUpperCase();
    } else {
      correctServiceCategory += serviceCategory[i];
    }
  };

  Service.find({category: correctServiceCategory}) // UWU buscar users by category e.g. 'technology'
    .then((users) => {
      console.log(users);
    })
    .catch(next);

  res.render('services-category');
});

module.exports = router;

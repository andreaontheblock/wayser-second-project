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
  const correctServiceCategory = serviceCategory.charAt(0).toUpperCase() + serviceCategory.substr(1);

  Service.find({category: correctServiceCategory}) // UWU buscar users by category e.g. 'technology'
    .then((users) => {
      res.render('services-category', {users: users});
    })
    .catch(next);
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:params', function (req, res, next) {
  res.render('services-category');
});

module.exports = router;

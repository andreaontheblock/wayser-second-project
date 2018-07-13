'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const currentUser = req.session.currentUser;
  res.render('profile', {currentUser: currentUser});
});

router.get('/create-service', (req, res, next) => {
  res.render('create-service');
});

module.exports = router;

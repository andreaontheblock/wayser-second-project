'use strict';

const express = require('express');
const router = express.Router();

const Service = require('../models/service');
const isIdValid = require('../middlewares/isIdValid');

router.get('/services/:serviceId', isIdValid, (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(401).json({error: 'not authorized'});
    return;
  }

  const serviceId = req.params.serviceId;
  Service.findById(serviceId).populate('provider')
    .then((service) => {
      if (!service) {
        res.status(404).json({error: 'not found'});
        return;
      }
      res.json(service);
    })
    .catch((err) => {
      console.error('ERROR', req.method, req.path, err);
      res.status(500).json({error: 'server error'});
    });
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const Service = require('../models/service');
const User = require('../models/user');
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');
const editImg = require('../helpers/edit-img');

/* GET home page. */
router.get('/', isUserLoggedIn, (req, res, next) => {
  const filter = {
    provider: req.session.currentUser._id
  };

  Service.find(filter).populate('provider')
    .then((result) => {
      const data = {
        messages: req.flash('picture-upload-error'),
        services: result
      };
      res.render('profile', data);
    })
    .catch(next);
});

router.get('/create-service', isUserLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('create-service-error')
  };
  res.render('create-service', data);
});

router.post('/create-service', isUserLoggedIn, (req, res, next) => {
  if (!req.body.job || !req.body.category || !req.body.priceNumber || !req.body.priceText || req.body.description) {
    req.flash('create-service-error', 'Please complete all fields');
    res.redirect('/profile/create-service');
    return;
  }

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
// UWU FELIPE EXPRAINNNNN
router.post('/upload', upload.single('photo'), (req, res, next) => {
  if (!req.file) {
    req.flash('picture-upload-error', 'Please select an image');
    res.redirect('/profile');
    return;
  }

  const imgURL = editImg(req.file.url);
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate(userId, {imgUrl: imgURL}, {new: true})
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      res.redirect('/profile');
    })
    .catch(next);
});
module.exports = router;

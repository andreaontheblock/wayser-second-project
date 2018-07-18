'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Service = require('../models/service');

router.post('/:serviceId', (req, res, next) => {
  const serviceId = req.params.serviceId;
  // const currentUserEmail = req.session.currentUser.email;
  const currentUserName = req.session.currentUser.username;
  const message = req.body.message;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'wayser.bcn@gmail.com',
      pass: 'wayser1234'
    }
  });

  Service.findById(serviceId).populate('provider')
    .then((service) => {
      if (!service) {
        return next();
      }

      transporter.sendMail({
        from: '"Wayser" <wayser.bcn@gmail.com>',
        to: `${service.provider.email}`,
        subject: `Wayser Updates: ${currentUserName} is interested in your service`,
        text: message,
        html: `<p>This is what ${currentUserName} sent you: </p><b>${message}</b>`
      })
        .then(() => {
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;

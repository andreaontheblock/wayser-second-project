'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator'); // Package email validator

const User = require('../models/user');
const isUserLoggedOut = require('../middlewares/isUserLoggedOut');
const saltRounds = 10;

router.get('/signup', isUserLoggedOut, (req, res, next) => {
  const data = {
    messages: req.flash('signup-error')
  };
  res.render('auth/signup', data);
});

router.post('/signup', isUserLoggedOut, (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    req.flash('signup-error', 'Please complete all fields');
    res.redirect('/auth/signup');
    return;
  }

  const criteria = {
    $or: [
      {username: req.body.username},
      {email: req.body.email}
    ]
  };
  User.findOne(criteria)
    .then((user) => {
      if (user) {
        if (user.username === req.body.username) {
          req.flash('signup-error', 'Username already taken');
        } else {
          req.flash('signup-error', 'Email already taken');
        }
        res.redirect('/auth/signup');
        return;
      }

      if (!validator.isEmail(req.body.email)) {
        req.flash('signup-error', 'Please enter a valid email');
        res.redirect('/auth/signup');
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        location: {
          type: 'Point',
          coordinates: [req.body.latitude, req.body.longitude]
        }
      });

      newUser.save()
        .then(() => {
          req.session.currentUser = newUser;

          if (req.session.counter === 1) {
            var lastUrlbeforeSignIn = req.session.lastURL;
            req.session.counter = 0;

            res.redirect(`/${lastUrlbeforeSignIn}`);
            return next;
          }
          res.redirect('/profile');
        })
        .catch(next);
    })
    .catch(next);
});

router.get('/login', isUserLoggedOut, (req, res, next) => {
  const data = {
    messages: req.flash('login-error')
  };
  res.render('auth/login', data);
});

router.post('/login', isUserLoggedOut, (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    req.flash('login-error', 'Please provide a username and password');
    res.redirect('/auth/login');
    return;
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        req.flash('login-error', 'Incorrect username');
        res.redirect('/auth/login');
        return;
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        req.flash('login-error', 'Incorrect password');
        res.redirect('/auth/login');
        return;
      }
      req.session.currentUser = user;

      if (req.session.counter === 1) {
        var lastUrlbeforeSignIn = req.session.lastURL;
        req.session.counter = 0;

        res.redirect(`/${lastUrlbeforeSignIn}`);
        return next;
      }
      res.redirect('/');
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;

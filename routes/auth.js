'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator'); // Package email validator

const User = require('../models/user');
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');
const saltRounds = 10;

// the routes to render the form is /auth/signup
router.get('/signup', isUserLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('signup-error')
  };
  res.render('auth/signup', data);
});

router.post('/signup', isUserLoggedIn, (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    req.flash('signup-error', 'Please complete all fields');
    res.redirect('/auth/signup');
    return;
  }

  User.findOne({username: req.body.username})
    .then((user) => {
      if (user) {
        req.flash('signup-error', 'Username already taken');
        res.redirect('/auth/signup');
        return;
      }

      return User.findOne({email: req.body.email})
        .then((user) => {
          if (user) {
            req.flash('signup-error', 'Email already taken');
            res.redirect('/auth/signup');
            return;
          }
          if (!validator.isEmail(req.body.email)) { // Validating email
            req.flash('signup-error', 'Please enter a valid email');
            res.redirect('/auth/signup');
            return;
          }

          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(req.body.password, salt);

          const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
          });

          newUser.save()
            .then(() => {
              req.session.currentUser = newUser;
              res.redirect('/profile');
            })
            .catch(next);
        });
    })
    .catch(next);
});

router.get('/login', isUserLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('login-error')
  };
  res.render('auth/login', data);
});

router.post('/login', isUserLoggedIn, (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    req.flash('login-error', 'Please provide a username and password');
    res.redirect('/auth/login');
    return;
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        req.flash('login-error', 'Username or password are incorrect');
        res.redirect('/auth/login');
        return;
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        req.flash('login-error', 'Username or password are incorrect');
        res.redirect('/auth/login');
        return;
      }
      req.session.currentUser = user;
      res.redirect('/');
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;

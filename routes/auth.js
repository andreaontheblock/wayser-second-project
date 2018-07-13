'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const saltRounds = 10;

// the routes to render the form ias /auth/signup
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    // why return?? UWU PARA QUE PARE LA FUNCION, Y NO SIGA Y NO HAGA RENDER.
    return;
  }

  const data = {
    messages: req.flash('signup-error')
  };

  res.render('auth/signup', data);
});

// c
// u

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }

  if (!req.body.username || !req.body.password) {
    req.flash('signup-error', 'flaco, escribí algo, no seás boludo');
    res.redirect('/auth/signup');
    return;
  }

  User.findOne({username: req.body.username})
    .then((user) => {
      if (user) {
        req.flash('signup-error', 'pelotudo, un poco de originalidad');
        res.redirect('/auth/signup');
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        location: {
          type: 'Point',
          coordinates: [req.body.latitude, req.body.longitude]
        }
      });

      newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

// cn
// uj
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }

  const data = {
    messages: req.flash('login-error')
  };
  res.render('auth/login', data);
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  if (!req.body.username || !req.body.password) {
    req.flash('login-error', 'please provide a username and password');
    res.redirect('/auth/login');
    return;
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        req.flash('login-error', 'username or password are incorrect');
        res.redirect('/auth/login');
        return;
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        req.flash('login-error', 'username or password are incorrect');
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

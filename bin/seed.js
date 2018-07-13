'use strict';

const mongoose = require('mongoose');
const User = require('../models/user');
const Service = require('../models/service');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const dbName = 'wayser';
mongoose.connect(`mongodb://localhost/${dbName}`);

User.collection.drop();// si lo haces correr dos veces borra lo de antes y te lo hhace correr una vez
Service.collection.drop();// da error si la coleccion no tiene nada pero funciona igual

const users = [
  {
    username: 'Montse',
    password: bcrypt.hashSync('montse', salt).toString(),
    email: 'montse@montse.com'
  },
  {
    username: 'Jose',
    password: bcrypt.hashSync('jose', salt).toString(),
    email: 'jose@jose.com'
  },
  {
    username: 'Javi',
    password: bcrypt.hashSync('javi', salt).toString(),
    email: 'javi@javi.com'
  },
  {
    username: 'Andrea',
    password: bcrypt.hashSync('andrea', salt).toString(),
    email: 'andrea@andrea.com'
  },
  {
    username: 'Will',
    password: bcrypt.hashSync('will', salt).toString(),
    email: 'will@will.com'
  },
  {
    username: 'Sebas',
    password: bcrypt.hashSync('sebas', salt).toString(),
    email: 'sebas@sebas.com'
  },
  {
    username: 'Daniela',
    password: bcrypt.hashSync('daniela', salt).toString(),
    email: 'daniela@daniela.com'
  },
  {
    username: 'Gabriel',
    password: bcrypt.hashSync('gabriel', salt).toString(),
    email: 'gabriel@gabriel.com'
  }
];

User.create(users)
// UWU el domingo montsita explica esta vaina
  .then((users) => {
    const usersIds = [];
    users.forEach(function (item) {
      usersIds.push(item._id);
    });

    console.log(`Created ${users.length} users`);

    const services = [
      {
        name: 'French Teacher',
        category: 'Education',
        provider: usersIds[0],
        price: {
          amount: '15',
          unit: 'hour'
        }
      },
      {
        name: 'Web developer',
        category: 'Technology',
        provider: usersIds[1],
        price: {
          amount: '60',
          unit: 'hour'
        }
      },
      {
        name: 'Nurse',
        category: 'Health Care',
        provider: usersIds[2],
        price: {
          amount: '50',
          unit: 'hour'
        }
      },
      {
        name: 'Private driver',
        category: 'Transportation',
        provider: usersIds[3],
        price: {
          amount: '25',
          unit: 'hour'
        }
      },
      {
        name: 'Babysitter',
        category: 'Social Services',
        provider: usersIds[4],
        price: {
          amount: '50',
          unit: 'day'
        }
      },
      {
        name: 'High school Janitor',
        category: 'Maintenance',
        provider: usersIds[5],
        price: {
          amount: '23',
          unit: 'hour'
        }
      },
      {
        name: 'Consultant',
        category: 'Business',
        provider: usersIds[6],
        price: {
          amount: '50',
          unit: 'hour'
        }
      },
      {
        name: 'Local Guide',
        category: 'Tourism',
        provider: usersIds[7],
        price: {
          amount: '190',
          unit: 'week'
        }
      },
      {
        name: 'Donald Trump Impersonator',
        category: 'Others',
        provider: usersIds[7],
        price: {
          amount: '20',
          unit: 'hour'
        }
      }
    ];

    return Service.create(services)
      .then((services) => {
        console.log(`Created ${services.length} services`);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    throw (err);
  });

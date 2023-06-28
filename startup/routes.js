const express = require('express');
const genre = require('../routes/genre');
const customer = require('../routes/customer');
const movie = require('../routes/movie');
const rental = require('../routes/rental');
const user = require('../routes/user');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/genre', genre);
  app.use('/api/customer', customer);
  app.use('/api/movie', movie);
  app.use('/api/rental', rental);
  app.use('/api/user', user);
};

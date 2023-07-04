require('dotenv').config();
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  mongoose.connect(process.env.URI).then(() => {
    winston.info('Connected to MongoBD....');
  });
};

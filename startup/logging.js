const winston = require('winston');
require('express-async-errors');

module.exports = function () {
  // Logging errors in a log file
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
};

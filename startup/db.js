const mongoose = require('mongoose');
const winston = requir('winston');

module.exports = function () {
  mongoose.connect(process.env.URI).then(() => {
    winston.info('Connected to MongoBD....');
  });
};

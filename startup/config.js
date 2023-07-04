require('dotenv').config();

module.exports = function () {
  if (!process.env.KEY) {
    throw new Error('Fatal Error. JWT key is not defined');
  }
};

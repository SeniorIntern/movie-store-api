const mongoose = require('mongoose');

module.exports = function () {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log('Connected to MongoBD');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

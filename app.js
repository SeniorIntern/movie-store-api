require('dotenv').config();
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT;
app.listen(port, () => {
  winston.info(`listening on port: ${port}`);
});

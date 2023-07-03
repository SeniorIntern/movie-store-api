require('dotenv').config();

const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);

if (!process.env.KEY) process.exit('Fatal Error. JWT key is not defined');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

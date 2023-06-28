require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No Token. Access Denied');

  try {
    decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token.' + err.message);
  }
};

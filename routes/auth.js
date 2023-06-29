const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send('Bad Request. Invalid email or password');

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) res.status(400).send('Bad Request. Invalid email or password');

  const token = await user.generateAuthToken();
  res.status(200).header('x-auth-token', token).send(isValid);
});

module.exports = router;

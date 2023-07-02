const { User } = require('../models/user');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObject');
const admin = require('../middleware/admin');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).send(`User Not Found.`);
  res.status(200).send(user);
});

router.get('/', async (req, res) => {
  const users = await User.find().sort('name').select('-password');
  res.status(200).send(users);
});

router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = await user.generateAuthToken();
  res
    .status(200)
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id', [validateObjectId, auth], async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User Not Found.');

  user.set(_.pick(req.body, ['name', 'email', 'passsword']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/:id', validateObjectId, async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).send(`User Not Found.`);
  res.status(200).send(user);
});

module.exports = router;

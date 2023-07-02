const { Customer } = require('../models/customer');
const validateObjectId = require('../middleware/validateObject');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.status(200).send(customers);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Customer Not Found.');
  res.status(200).send(customer);
});

router.post('/', auth, async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  await customer.save();
  res.status(200).send(customer);
});

router.put('/:id', auth, validateObjectId, async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
    },
    { new: true }
  );
  res.status(200).send(customer);
});

router.delete('/:id', [auth, admin], validateObjectId, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) res.status(200).send('Customer Not Found.');
  res.status(200).send(customer);
});

module.exports = router;

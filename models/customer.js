require('dotenv').config();
const Joi = require('joi');
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 24,
    trim: true,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    min: 5,
    max: 50,
    required: true,
  },
});

const Customer = mongoose.model('customers', CustomerSchema);

function validateCustomer(customer) {
  const { name, isGold, phone } = customer;
  const schema = Joi.object({
    name: Joi.string().min(4).max(24).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate({ name, isGold, phone });
}

exports.validate = validateCustomer;
exports.Customer = Customer;

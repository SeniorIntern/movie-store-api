require('dotenv').config();
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 24,
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

exports.Customer = Customer;

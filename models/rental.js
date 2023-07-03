require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('joi');

const RentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
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
        min: 8,
        required: true,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model('rentals', RentalSchema);

function validateRental(rental) {
  const { customerId, movieId } = rental;
  const schema = Joi.object({
    customerId: Joi.string().min(24).max(24).required(),
    movieId: Joi.string().min(24).max(24).required(),
  });
  return schema.validate({ customerId, movieId });
}

exports.validate = validateRental;
exports.Rental = Rental;

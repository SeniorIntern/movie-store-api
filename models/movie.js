require('dotenv').config();
const mongoose = require('mongoose');
const { GenreSchema } = require('./genre');
const Joi = require('joi');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
    required: true,
  },
  genre: {
    type: GenreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
    trim: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
    trim: true,
  },
});

const Movie = mongoose.model('movies', MovieSchema);

function validateMovie(movie) {
  const { title, genreId, numberInStock, dailyRentalRate } = movie;
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genreId: Joi.string().min(24).max(24).required(),
    numberInStock: Joi.number().min(3).max(255).required(),
    dailyRentalRate: Joi.number().min(3).max(255).required(),
  });
  return schema.validate({ title, genreId, numberInStock, dailyRentalRate });
}

exports.validate = validateMovie;
exports.Movie = Movie;

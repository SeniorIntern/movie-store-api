require('dotenv').config();
const mongoose = require('mongoose');
const { GenreSchema } = require('./genre');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 255,
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
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
});

const Movie = mongoose.model('movies', MovieSchema);

exports.Movie = Movie;

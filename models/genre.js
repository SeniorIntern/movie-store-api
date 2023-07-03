require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('joi');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
});

const Genre = mongoose.model('genres', GenreSchema);

function validateGenre(genre) {
  const { name } = genre;
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate({ name });
}

exports.validate = validateGenre;
exports.GenreSchema = GenreSchema;
exports.Genre = Genre;

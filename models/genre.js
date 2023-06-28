require('dotenv').config();
const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
});

const Genre = mongoose.model('genres', GenreSchema);

exports.GenreSchema = GenreSchema;
exports.Genre = Genre;

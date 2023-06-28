require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 24,
    required: true,
  },
  email: {
    type: String,
    minlength: 11,
    maxlength: 104,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 7,
    maxlength: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.KEY
  );
  return token;
};

const User = mongoose.model('users', UserSchema);

exports.User = User;

require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 24,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 11,
    maxlength: 104,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 7,
    maxlength: 1024,
    required: true,
    trim: true,
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

function validateUser(user) {
  const { name, email, password, isAdmin } = user;
  const schema = Joi.object({
    name: Joi.string().min(4).max(24).required(),
    email: Joi.string().min(11).max(104).required(),
    password: Joi.string().min(7).max(54).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate({ name, email, password, isAdmin });
}

exports.validate = validateUser;
exports.User = User;

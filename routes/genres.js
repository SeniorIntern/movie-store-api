const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObject');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(200).send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} was not found.`);

  res.status(200).send(genre);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save();
  res.status(200).send(genre);
});

router.put('/:id', [validateObjectId, auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );
  if (!genre)
    return res.status(404).send(`The genre with id: ${id} was not found.`);

  res.status(200).send(genre);
});

router.delete('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} was not found.`);
  res.status(200).send(genre);
});

module.exports = router;

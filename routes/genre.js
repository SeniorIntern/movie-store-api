const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(200).send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} was not found.`);

  res.status(200).send(genre);
});

router.post('/', auth, async (req, res) => {
  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save();
  res.status(200).send(genre);
});

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} was not found.`);
  res.status(200).send(genre);
});

module.exports = router;

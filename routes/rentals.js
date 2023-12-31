const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const validateObjectId = require('../middleware/validateObject');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  res.status(200).send(rentals);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('Rental Not Found.');
  res.status(200).send(rental);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send('Customer Not Found.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send('Movie Not Found.');

  if (movie.numberInStock === 0)
    return res.status(400).send(`Movie- ${movie.title} is not in stock.`);

  const rental = new Rental({
    customer: {
      _id: customer._id,
      isGold: customer.isGold,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  await rental.save();

  movie.numberInStock--;
  await Movie.findByIdAndUpdate(movie._id, {
    numberInStock: movie.numberInStock,
  });

  res.status(200).send(rental);
});

module.exports = router;

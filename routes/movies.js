const { Movie, validate } = require('../models/movie');
const { Gener } = require('../models/geners');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const gener = await Gener.findById(req.body.generId);
    if (!gener) return res.status(400).send('Invalid gener..');
    const movie = new Movie({
        title: req.body.title,
        gener: {
            _id: gener._id,
            name: gener.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();

    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gener = await Genre.findById(req.body.generId);
    if (!gener) return res.status(400).send('Invalid gener..');
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});
router.delete('/:id', async (req, res) => {
    const movie = Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(400).send('The movie with the given Id was not found.');

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(400).send('the movie with given Id wasnot found..');

    res.send(movie);
});

module.exports = router;

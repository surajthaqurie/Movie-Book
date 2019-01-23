const Joi = require('joi');
const mongoose = require('mongoose');
const { generSchema } = require('./geners');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: generSchema,
        requried: true
    },
    numberInStock: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).requried(),
        generId: Joi.string().requried(),
        numberInStock: Joi.number().min(0).requried(),
        dailyRentalRate: Joi.number().min(0).requried()
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;

const express = require('express');
const error = require('../middleware/error');

const geners = require('../routes/geners');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auths = require('../routes/auth');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/geners', geners);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auths);
    app.use(error);

}
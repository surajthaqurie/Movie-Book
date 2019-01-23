const winston = require('winston');

module.exports = function (err, req, res, next) {
    // log the expection
    winston.err(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('internal error');
}

require('express-async-errors');
const winston = require('winston');
//require('winston-mongodb');

module.exports = function () {
    // process.on('uncaughtException', (ex) => {
    //     // console.log('We got an uncaughtException');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint:true}),
        new winston.transports.File({ filename: 'uncaughtExpextion.log' }));

    process.on('unhandledRejection', (ex) => {
        // // console.log('We got an unhandled Rejection');
        // winston.error(ex.message, ex);
        // process.exit(1);
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/vidly',
    //     level: 'info'
    // });
}
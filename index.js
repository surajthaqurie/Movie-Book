const express = require('express');
const app = express();
const winston = require('winston');


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


// const p = Promise.reject(new Error('Something Failed during Startup'));
// p.then(() => console.log('Done with promise method'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening port ${port}...`));

module.exports = server;
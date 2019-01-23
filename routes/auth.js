const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('joi');



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password..');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password..');

    const token = user.generateAuthToken();
    //res.send(true);
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    };
    return Joi.validate(req, schema);
}

module.exports = router;

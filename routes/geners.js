const mongoose = require('mongoose');
const { Gener, validate } = require('../models/geners');
//const asyncMiddlerware = require('../middleware/async');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
//const Joi = require('joi');

/*
const geners = [
    { id: 1, name: 'action' },
    { id: 2, name: 'romantic' },
    { id: 3, name: 'horor' },
    { id: 4, name: 'historic' },

];
*/

router.get('/', async (req, res) => {
    throw new Error('Could not get the geners..');
    const geners = await Gener.find().sort('name');
    res.send(geners);
});


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let gener = new Gener({ name: req.body.name });
    /*
    const gener={
        id: geners.length + 1,
        name: req.body.name
    };
    */
    // geners.push(gener);
    gener = await gener.save();
    res.send(gener);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gener = await Gener.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    // const gener = geners.find(c => c.id === parseInt(req.params.id));

    if (!gener) return res.status(400).send('The give id of Gener is not found');

    // here line no 48
    // here line no 49
    // gener.name = req.body.name;
    res.send(gener);
});
router.delete('/:id', [auth, admin], async (req, res) => {
    const gener = await Gener.findByIdAndRemove(req.params.id);

    //const gener = geners.find(c => c.id === parseInt(req.params.id));
    if (!gener) return res.status(400).send('The given Id is not found');

    //  const index = geners.indexOf(gener);
    // geners.splice(index, 1);
    res.send(gener);
});
router.get('/:id', async (req, res) => {
    const gener = await Gener.findById(req.params.id);
    //const gener = geners.find(c => c.id === parseInt(req.params.id));
    if (!gener) return res.status(400).send('The given id is not founded');

    res.send(gener);
});

module.exports = router;
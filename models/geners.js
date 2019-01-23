const mongoose = require('mongoose');
const Joi = require('joi');

const generSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Gener = mongoose.model('Gener', generSchema);

function validateGener(gener) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(gener, schema);
}
exports.generSchema = generSchema;
exports.Gener = Gener;
exports.validate = validateGener;
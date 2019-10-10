const mongoose = require('mongoose');
//mongoose = require('mongoose').set('debug', true);

const {Schema} = mongoose;

const TarjetasSchema = new Schema({
    _id: String,
    description: String,
    brand: String,
    model: String,
    series: String,
    uaz: String
});

module.exports = mongoose.model('TarjetasSchema', TarjetasSchema, 'tarjetas');
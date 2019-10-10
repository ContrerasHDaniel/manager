//const mongoose = require('mongoose');
mongoose = require('mongoose').set('debug', true);
const ObjectId = mongoose.Types.ObjectId;
const {Schema} = mongoose;

const Inventario = new Schema({
    _id: ObjectId,
    description: String,
    type: String,
    brand: String,
    model: String,
    serial: String,
    uaz: String,
    guard: String,
    location: String,
    details: String,
    funding: String,
    rfid: String
});

ObjectId.prototype.valueOf = function(){
    return this.toString();
}

module.exports = mongoose.model('InventarioSchema', Inventario, 'inventarioEquipo');
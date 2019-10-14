const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) => {
    // Genera el hash
    const salt = await bcrypt.genSalt(10);
    // Cifra la contraseña
    const hash = bcrypt.hash(password, salt);
    return hash;
};

// Se usa function para acceder a las propiedades de UserSchema.
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema, 'users');
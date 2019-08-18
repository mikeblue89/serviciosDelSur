const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
     
    codigoEmpleado: Number,
    name: String,
    lastName: String,    
    nit: Number,    
    numeroCuenta: Number,
    telefono: Number,
    email: String,
    nick: String,
    password: String,
    roles: String

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
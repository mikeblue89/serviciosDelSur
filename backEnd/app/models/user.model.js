const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
     
    employeeCode: Number,
    name: String,
    lastName: String,    
    nit: Number,    
    accountNumber: Number,
    phone: Number,
    email: String,
    nick: String,
    password: String,
    roles: String

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
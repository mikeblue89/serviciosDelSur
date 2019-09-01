const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
     
    nit: Number,
    name: String,    
    adress: String,    
    telephone: Number,
    email: String,
    contact: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
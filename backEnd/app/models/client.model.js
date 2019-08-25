const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
     
    Nit: Number,
    Name: String,    
    Adress: String,    
    Telephone: Number,
    Email: String,
    Contact: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
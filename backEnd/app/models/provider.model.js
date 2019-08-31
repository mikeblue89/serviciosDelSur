const mongoose = require('mongoose');

const ProviderSchema = mongoose.Schema({
     
    Nit: Number,
    Name: String,    
    Adress: String,    
    Phone: Number,
    Email: String,
    Contact: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Provider', ProviderSchema);
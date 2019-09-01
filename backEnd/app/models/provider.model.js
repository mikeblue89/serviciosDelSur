const mongoose = require('mongoose');

const ProviderSchema = mongoose.Schema({
     
    nit: Number,
    name: String,    
    adress: String,    
    phone: Number,
    email: String,
    contact: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Provider', ProviderSchema);
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
     
    Codigo: Number,
    CodigoDeBarras: String,
    Name: String,    
    Description: String,    
    LastCost: Number,
    Brand: String,
    Model: String,
    Manufacturer: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);


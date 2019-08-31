const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
     
    Code: Number,
    Barcode: String,
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


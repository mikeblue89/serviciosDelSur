const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
     
    code: Number,
    barcode: String,
    name: String,    
    description: String,    
    lastCost: Number,
    brand: String,
    model: String,
    manufacturer: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);


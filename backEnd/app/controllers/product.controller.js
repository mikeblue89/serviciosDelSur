const Product = require('../models/product.model.js');
const wrapper = require('../utils/wrapper');


let isValid = (product) => {
    if (!product.Codigo) {
        return { isValid: false, propertyInvalid: "Codigo" };
    } else if (!product.CodigoDeBarras){
        return { isValid: false, propertyInvalid: "CodigoDeBarras" };
    } else if (!product.Name){
        return { isValid: false, propertyInvalid: "Name" };
    } else if (!product.Description){
        return { isValid: false, propertyInvalid: "Description" };
    } else if (!product.LastCost){
        return { isValid: false, propertyInvalid: "LastCost" };
    } else if (!product.Brand){
        return { isValid: false, propertyInvalid: "Brand" };
    } else if (!product.Model){
        return { isValid: false, propertyInvalid: "Model" };
    } else if (!product.Manufacturer){
        return { isValid: false, propertyInvalid: "Manufacturer" };
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "product metadata queried successfully", "error": false, "data": product.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/product/metadata", response: response, httpCode: 200, res: res });
};

exports.create = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Product content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/products", response: response, httpCode: 400, res: res });
    } else {
    
        const newProduct = new Product({
            Codigo: req.body.Codigo,
            CodigoDeBarras: req.body.CodigoDeBarras,
            Name: req.body.Name,    
            Description: req.body.Description,    
            LastCost: req.body.LastCost,
            Brand: req.body.Brand,
            Model: req.body.Model,
            Manufacturer: req.body.Manufacturer
        });

        let validation = isValid(newProduct);

        if (!validation.isValid) {
            let response = { "status": "error", "message": "Product " + validation.propertyInvalid + " is required", "error": true, "data": newProduct };
            return wrapper.sendResponse({ method: "POST /api/product", response: response, httpCode: 400, res: res });
        } else {
            
            newProduct.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Product saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/product", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Product", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/product", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            if (products && products.length > 0) {
                let response = { "status": "ok", "message": "Products queried successfully", "error": false, "data": products };
                return wrapper.sendResponse({ method: "GET /api/product", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/product", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving products", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/product", response: response, httpCode: 500, res: res });
        });
};
//search by product
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                let response = { "status": "error", "message": "Product not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/product/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Product queried successfully", "error": false, "data": product };
                return wrapper.sendResponse({ method: "GET /api/product/" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Product not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/product/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving product with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/product", response: response, httpCode: 500, res: res });
            }
        });
};




exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Product content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 400, res: res });
    } else {
         
        const productToUpdate = {
            Codigo: req.body.Codigo,
            CodigoDeBarras: req.body.CodigoDeBarras,
            Name: req.body.Name,    
            Description: req.body.Description,    
            LastCost: req.body.LastCost,
            Brand: req.body.Brand,
            Model: req.body.Model,
            Manufacturer: req.body.Manufacturer
        };

        let validation = isValid(productToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Product " + validation.propertyInvalid + " is required", "error": true, "data": productToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 400, res: res });
        } else {
           
            Product.findByIdAndUpdate(req.body.codigoEmpleado, productToUpdate, { new: true, upsert: true })
                .then(product => {
                    if (!product) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the product with id" + req.body.codigoEmpleado, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Product updated successfully", "error": false, "data": product };
                        return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Product not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the product", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 500, res: res });
                    }
                });
        }
    }
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) {
                let response = { "status": "error", "message": "Product not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/product", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Product deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/product/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Product not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/product", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete product with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/product", response: response, httpCode: 500, res: res });
            }
        });
};
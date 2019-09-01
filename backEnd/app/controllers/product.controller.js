const Product = require('../models/product.model.js');
const wrapper = require('../utils/wrapper');


let isValid = (product) => {
    if (!product.code) {
        return { isValid: false, propertyInvalid: "code" };
    } else if (!product.barcode){
        return { isValid: false, propertyInvalid: "barcode" };
    } else if (!product.name){
        return { isValid: false, propertyInvalid: "name" };
    } else if (!product.description){
        return { isValid: false, propertyInvalid: "description" };
    } else if (!product.lastCost){
        return { isValid: false, propertyInvalid: "lastCost" };
    } else if (!product.brand){
        return { isValid: false, propertyInvalid: "brand" };
    } else if (!product.model){
        return { isValid: false, propertyInvalid: "model" };
    } else if (!product.manufacturer){
        return { isValid: false, propertyInvalid: "manufacturer" };
    } else{
        return {isValid: true, propertyInvalid: undefined}
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "product metadata queried successfully", "error": false, "data": Product.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/product/metadata", response: response, httpCode: 200, res: res });
};

exports.create = (req, res) => {  
    if (!req.body) {
        let response = { "status": "error", "message": "Product content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/product", response: response, httpCode: 400, res: res });
    } else {
    
        const newProduct = new Product({
            code: req.body.code,
            barcode: req.body.barcode,
            name: req.body.name,    
            description: req.body.description,    
            lastCost: req.body.lastCost,
            brand: req.body.brand,
            model: req.body.model,
            manufacturer: req.body.manufacturer
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

//Search by Parameter
exports.findByParameter= (req, res) => {

    Product.findOne({[req.body.parameter] : req.body.value}, (error, product) => {
        if (error) {
                let response = { "status": "error", "message": " Error encountered on returning the requested result", "error": true, "data": error.message};
                return wrapper.sendResponse({method: "GET /api/product/find", response: response, httpCode: 500, res: res});
        } 
        else if(!product) {
            let response = {"status": "error", "message": "Error retrieving product.", "error": true, "data": undefined };
            return wrapper.sendResponse({method: "GET /api/find", response: response, httpCode: 401, res: res});
            }
        else{
            let response = { "status": "ok", "message": "Product retrieved succesfully", "error": false, "data": product};
            return wrapper.sendResponse({ method: "GET /api/product/find", response: response, httpCode: 200, res: res }); 
            }
        } 
        )};
// close the find element

exports.findOneProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                let response = { "status": "error", "message": "Product not found with given information" + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/product/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Product queried successfully", "error": false, "data": product };
                return wrapper.sendResponse({ method: "GET /api/product/:id" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Product not found with id findOne " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/product/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving product with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/product/:id", response: response, httpCode: 500, res: res });
            }
        });
};

exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Product content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 400, res: res });
    } else {
         
        const productToUpdate = {
            code: req.body.code,
            barcode: req.body.barcode,
            name: req.body.name,    
            description: req.body.description,    
            lastCost: req.body.lastCost,
            brand: req.body.brand,
            model: req.body.model,
            manufacturer: req.body.manufacturer
        };

        let validation = isValid(productToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Product " + validation.propertyInvalid + " is required", "error": true, "data": productToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/product", response: response, httpCode: 400, res: res });
        } else {
           
            Product.findByIdAndUpdate(req.body.employeeCode, productToUpdate, { new: true, upsert: true })
                .then(product => {
                    if (!product) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the product with id" + req.body.employeeCode, "error": true, "data": undefined };
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
                let response = { "status": "error", "message": "Product not found with" + req.params.id, "error": true, "data": undefined };
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
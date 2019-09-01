const Provider = require('../models/provider.model.js');
const wrapper = require('../utils/wrapper');


let isValid = (provider) => {
    if (!provider.nit) {
        return { isValid: false, propertyInvalid: "nit" };
    } else if (!provider.name){
        return { isValid: false, propertyInvalid: "name" };
    } else if (!provider.adress){
        return { isValid: false, propertyInvalid: "adress" };
    } else if (!provider.phone){
        return { isValid: false, propertyInvalid: "phone" };
    } else if (!provider.email){
        return { isValid: false, propertyInvalid: "email" };
    } else if (!provider.contact){
        return { isValid: false, propertyInvalid: "contact" };
    } else{
        return {isValid: true, propertyInvalid: undefined}
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "provider metadata queried successfully", "error": false, "data": Provider.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/provider/metadata", response: response, httpCode: 200, res: res });
};

exports.create = (req, res) => {  
    if (!req.body) {
        let response = { "status": "error", "message": "Provider content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/provider", response: response, httpCode: 400, res: res });
    } else {
    
        const newProvider = new Provider({
            nit: req.body.nit,
            name: req.body.name,
            adress: req.body.adress,    
            phone: req.body.phone,    
            email: req.body.email,
            contact: req.body.contact,
            
        });
        

        let validation = isValid(newProvider);

        if (!validation.isValid) {
            let response = { "status": "error", "message": "Provider " + validation.propertyInvalid + " is required", "error": true, "data": newProvider };
            return wrapper.sendResponse({ method: "POST /api/provider", response: response, httpCode: 400, res: res });
        } else {
            
            newProvider.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Provider saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/provider", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Provider", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/provider", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Provider.find()
        .then(providers => {
            if (providers && providers.length > 0) {
                let response = { "status": "ok", "message": "Providers queried successfully", "error": false, "data": providers };
                return wrapper.sendResponse({ method: "GET /api/provider", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/provider", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving providers", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/provider", response: response, httpCode: 500, res: res });
        });
};

//Search by Parameter
exports.findByParameter= (req, res) => {

    Provider.findOne({[req.body.parameter] : req.body.value}, (error, provider) => {
        if (error) {
                let response = { "status": "error", "message": " Error encountered on returning the requested result", "error": true, "data": error.message};
                return wrapper.sendResponse({method: "GET /api/provider/findProvider", response: response, httpCode: 500, res: res});
        } 
        else if(!provider) {
            let response = {"status": "error", "message": "Error retrieving provider.", "error": true, "data": undefined };
            return wrapper.sendResponse({method: "GET /api/findProvider", response: response, httpCode: 401, res: res});
            }
        else{
            let response = { "status": "ok", "message": "Provider retrieved succesfully", "error": false, "data": provider};
            return wrapper.sendResponse({ method: "GET /api/provider/findProvider", response: response, httpCode: 200, res: res }); 
            }
        } 
        )};
// close the find element

exports.findOneProvider = (req, res) => {
    Provider.findById(req.params.id)
        .then(provider => {
            if (!provider) {
                let response = { "status": "error", "message": "Provider not found with given information" + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/provider/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Provider queried successfully", "error": false, "data": provider };
                return wrapper.sendResponse({ method: "GET /api/provider/:id" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Provider not found with id findOne " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/provider/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving provider with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/provider/:id", response: response, httpCode: 500, res: res });
            }
        });
};

exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Provider content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/provider", response: response, httpCode: 400, res: res });
    } else {
         
        const providerToUpdate = {
            nit: req.body.nit,
            name: req.body.name,
            adress: req.body.adress,    
            phone: req.body.phone,    
            email: req.body.email,
            contact: req.body.contact
        };

        let validation = isValid(providerToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Provider " + validation.propertyInvalid + " is required", "error": true, "data": providerToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/provider", response: response, httpCode: 400, res: res });
        } else {
           
            Provider.findByIdAndUpdate(req.body.codigoEmpleado, providerToUpdate, { new: true, upsert: true })
                .then(provider => {
                    if (!provider) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the provider with id" + req.body.codigoEmpleado, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/provider", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Provider updated successfully", "error": false, "data": provider };
                        return wrapper.sendResponse({ method: "PUT /api/provider", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Provider not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/provider", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the provider", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/provider", response: response, httpCode: 500, res: res });
                    }
                });
        }
    }
};

exports.delete = (req, res) => {
    Provider.findByIdAndRemove(req.params.id)
        .then(provider => {
            if (!provider) {
                let response = { "status": "error", "message": "Provider not found with" + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/provider", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Provider deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/provider/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Provider not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/provider", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete provider with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/provider", response: response, httpCode: 500, res: res });
            }
        });
};
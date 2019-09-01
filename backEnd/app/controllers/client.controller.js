const Client = require('../models/client.model.js');
const wrapper = require('../utils/wrapper');


let isValid = (client) => {
    if (!client.nit) {
        return { isValid: false, propertyInvalid: "nit" };
    }  else if (!client.name){
        return { isValid: false, propertyInvalid: "name" };
    } else if (!client.adress){
        return { isValid: false, propertyInvalid: "adress" };
    } else if (!client.telephone){
        return { isValid: false, propertyInvalid: "telephone" };
    } else if (!client.email){
        return { isValid: false, propertyInvalid: "email" };
    } else if (!client.contact){
        return { isValid: false, propertyInvalid: "contact" };
    } else{
        return {isValid: true, propertyInvalid: undefined}
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "client metadata queried successfully", "error": false, "data": Client.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/client/metadata", response: response, httpCode: 200, res: res });
};

exports.create = (req, res) => {  
    if (!req.body) {
        let response = { "status": "error", "message": "Client content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/client", response: response, httpCode: 400, res: res });
    } else {
    
        const newClient = new Client({
            nit: req.body.nit,
            name: req.body.name,    
            adress: req.body.adress,    
            telephone: req.body.telephone,
            email: req.body.email,
            contact: req.body.contact
        });
        

        let validation = isValid(newClient);

        if (!validation.isValid) {
            let response = { "status": "error", "message": "Client " + validation.propertyInvalid + " is required", "error": true, "data": newClient };
            return wrapper.sendResponse({ method: "POST /api/client", response: response, httpCode: 400, res: res });
        } else {
            
            newClient.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Client saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/client", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Client", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/client", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Client.find()
        .then(clients => {
            if (clients && clients.length > 0) {
                let response = { "status": "ok", "message": "Clients queried successfully", "error": false, "data": clients };
                return wrapper.sendResponse({ method: "GET /api/client", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/client", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving clients", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/client", response: response, httpCode: 500, res: res });
        });
};

//Search by Parameter
exports.findByParameter= (req, res) => {

    Client.findOne({[req.body.parameter] : req.body.value}, (error, client) => {
        if (error) {
                let response = { "status": "error", "message": " Error encountered on returning the requested result", "error": true, "data": error.message};
                return wrapper.sendResponse({method: "GET /api/client/findClient", response: response, httpCode: 500, res: res});
        } 
        else if(!client) {
            let response = {"status": "error", "message": "Error retrieving client.", "error": true, "data": undefined };
            return wrapper.sendResponse({method: "GET /api/findClient", response: response, httpCode: 401, res: res});
            }
        else{
            let response = { "status": "ok", "message": "Client retrieved succesfully", "error": false, "data": client};
            return wrapper.sendResponse({ method: "GET /api/client/findClient", response: response, httpCode: 200, res: res }); 
            }
        } 
        )};
// close the find element

exports.findOneClient = (req, res) => {
    Client.findById(req.params.id)
        .then(client => {
            if (!client) {
                let response = { "status": "error", "message": "Client not found with given information" + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/client/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Client queried successfully", "error": false, "data": client };
                return wrapper.sendResponse({ method: "GET /api/client/:id" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Client not found with id findOne " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/client/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving client with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/client/:id", response: response, httpCode: 500, res: res });
            }
        });
};

exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Client content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/client", response: response, httpCode: 400, res: res });
    } else {
         
        const clientToUpdate = {
            nit: req.body.nit,
            name: req.body.name,    
            adress: req.body.adress,    
            telephone: req.body.telephone,
            email: req.body.email,
            contact: req.body.contact
        };

        let validation = isValid(clientToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Client " + validation.propertyInvalid + " is required", "error": true, "data": clientToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/client", response: response, httpCode: 400, res: res });
        } else {
           
            Client.findByIdAndUpdate(req.body.codigoEmpleado, clientToUpdate, { new: true, upsert: true })
                .then(client => {
                    if (!client) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the client with id" + req.body.codigoEmpleado, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/client", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Client updated successfully", "error": false, "data": client };
                        return wrapper.sendResponse({ method: "PUT /api/client", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Client not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/client", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the client", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/client", response: response, httpCode: 500, res: res });
                    }
                });
        }
    }
};

exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.id)
        .then(client => {
            if (!client) {
                let response = { "status": "error", "message": "Client not found with" + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/client", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Client deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/client/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Client not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/client", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete client with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/client", response: response, httpCode: 500, res: res });
            }
        });
};
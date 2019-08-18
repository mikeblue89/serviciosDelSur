const User = require('../models/user.model');
const wrapper = require('../utils/wrapper');


let isValid = (user) => {

    if (!user.codigoEmpleado) {
        return { isValid: false, propertyInvalid: "codigoEmpleado" };
    } else if (!user.name) {
        return { isValid: false, propertyInvalid: "name" };
    } else if (!user.lastName) {
        return { isValid: false, propertyInvalid: "lastName" };
    }else if (!user.nit) {
        return { isValid: false, propertyInvalid: "nit" };
    }else if (!user.numeroCuenta) {
        return { isValid: false, propertyInvalid: "numeroCuenta" };
    }else if (!user.telefono) {
        return { isValid: false, propertyInvalid: "telefono" };
    }else if (!email.email) {
        return { isValid: false, propertyInvalid: "email" };
    }else if (!email.nick) {
        return { isValid: false, propertyInvalid: "nick" };
    }else if (!email.password) {
        return { isValid: false, propertyInvalid: "password" };
    }else if (!roles.roles) {
        return { isValid: false, propertyInvalid: "roles" };
    }else {
        return { isValid: true, propertyInvalid: undefined }
    }

}


exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "User metadata queried successfully", "error": false, "data": User.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/user/metadata", response: response, httpCode: 200, res: res });
};

exports.create = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "User content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/user", response: response, httpCode: 400, res: res });
    } else {
    
        const newUser = new User({

            codigoEmpleado: req.body.codigoEmpleado,
            name: req.body.codigoEmpleado,
            lastName: req.body.codigoEmpleado,    
            nit: req.body.codigoEmpleado,    
            numeroCuenta: req.body.codigoEmpleado,
            telefono: req.body.codigoEmpleado,
            email: req.body.codigoEmpleado,
            nick: req.body.codigoEmpleado,
            password: req.body.codigoEmpleado,
            roles: req.body.codigoEmpleado

        });

        let validation = isValid(newUser);

        if (!validation.isValid) {
            let response = { "status": "error", "message": "User " + validation.propertyInvalid + " is required", "error": true, "data": newUser };
            return wrapper.sendResponse({ method: "POST /api/user", response: response, httpCode: 400, res: res });
        } else {
            
            newUser.password = bcrypt.hashSync(newUser.password, 8);
            
            newUser.save()
                .then(data => {
                    let response = { "status": "ok", "message": "User saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/user", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the User", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/user", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            if (users && users.length > 0) {
                let response = { "status": "ok", "message": "Users queried successfully", "error": false, "data": users };
                return wrapper.sendResponse({ method: "GET /api/user", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/user", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving users", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/user", response: response, httpCode: 500, res: res });
        });
};

exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                let response = { "status": "error", "message": "User not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/user/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "User queried successfully", "error": false, "data": user };
                return wrapper.sendResponse({ method: "GET /api/user/" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "User not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/user/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving user with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/user", response: response, httpCode: 500, res: res });
            }
        });
};


exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "User content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/user", response: response, httpCode: 400, res: res });
    } else {
         
        const userToUpdate = {
             
            codigoEmpleado: req.body.codigoEmpleado,
            name: req.body.codigoEmpleado,
            lastName: req.body.codigoEmpleado,    
            nit: req.body.codigoEmpleado,    
            numeroCuenta: req.body.codigoEmpleado,
            telefono: req.body.codigoEmpleado,
            email: req.body.codigoEmpleado,
            nick: req.body.codigoEmpleado,
            password: req.body.codigoEmpleado,
            roles: req.body.codigoEmpleado

        };

        let validation = isValid(userToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "User " + validation.propertyInvalid + " is required", "error": true, "data": userToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/user", response: response, httpCode: 400, res: res });
        } else {
            
            userToUpdate.password = bcrypt.hashSync(userToUpdate.password, 8);

           
            User.findByIdAndUpdate(req.body._id, userToUpdate, { new: true, upsert: true })
                .then(user => {
                    if (!user) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the user with id" + req.body._id, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/user", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "User updated successfully", "error": false, "data": user };
                        return wrapper.sendResponse({ method: "PUT /api/user", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "User not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/user", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the user", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/user", response: response, httpCode: 500, res: res });
                    }
                });
        }
    }
};


exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                let response = { "status": "error", "message": "User not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/user", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "User deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/user/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "User not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/user", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete user with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/user", response: response, httpCode: 500, res: res });
            }
        });
};
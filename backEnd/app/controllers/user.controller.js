const User = require('../models/user.model');
const wrapper = require('../utils/wrapper');
const bcrypt = require('bcryptjs');

let isValid = (user) => {

    if (!user.employeeCode) {
        return { isValid: false, propertyInvalid: "employeeCode" };
    } else if (!user.name) {
        return { isValid: false, propertyInvalid: "name" };
    } else if (!user.lastName) {
        return { isValid: false, propertyInvalid: "lastName" };
    }else if (!user.nit) {
        return { isValid: false, propertyInvalid: "nit" };
    }else if (!user.accountNumber) {
        return { isValid: false, propertyInvalid: "accountNumber" };
    }else if (!user.phone) {
        return { isValid: false, propertyInvalid: "phone" };
    }else if (!user.email) {
        return { isValid: false, propertyInvalid: "email" };
    }else if (!user.nick) {
        return { isValid: false, propertyInvalid: "nick" };
    }else if (!user.password) {
        return { isValid: false, propertyInvalid: "password" };
    }else if (!user.roles) {
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
            employeeCode: req.body.employeeCode,
            name: req.body.name,
            lastName: req.body.lastName,    
            nit: req.body.nit,    
            accountNumber: req.body.accountNumber,
            phone: req.body.phone,
            email: req.body.email,
            nick: req.body.nick,
            password: req.body.password,
            roles: req.body.roles
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


exports.search = (req, res) => {

    console.log(req.body);



    User.findOne({ [req.body.parameter] : req.body.value }, (error, user) => {
        if (error) {
            let response = { "status": "error", "message": "Some error occurred while login the User", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 500, res: res });
        } else if (!user) {
            console.log("Este es el usuario " + user);
            console.log("Este es el item " + item);
            
            console.log("Este es el parametro a buscar " + req.body.parameter);
            console.log("Este es el codigo a buscar " + req.body.value);

            let response = { "status": "error", "message": "no mames wey", "error": true, "data": undefined };
            return wrapper.sendResponse({ method: "GET /api/search", response: response, httpCode: 401, res: res });
        } else {
            
            let response = { "status": "ok", "message": "User authenticated successfully", "error": false, "data": user };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 200, res: res });
            
        }
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
            employeeCode: req.body.employeeCode,
            name: req.body.name,
            lastName: req.body.lastName,    
            nit: req.body.nit,    
            accountNumber: req.body.accountNumber,
            phone: req.body.phone,
            email: req.body.email,
            nick: req.body.nick,
            password: req.body.password,
            roles: req.body.roles
        };

        let validation = isValid(userToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "User " + validation.propertyInvalid + " is required", "error": true, "data": userToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/user", response: response, httpCode: 400, res: res });
        } else {
            
            
            newUser.password = bcrypt.hashSync(newUser.password, 8);
           
            User.findByIdAndUpdate(req.body.employeeCode, userToUpdate, { new: true, upsert: true })
                .then(user => {
                    if (!user) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the user with id" + req.body.employeeCode, "error": true, "data": undefined };
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
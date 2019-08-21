const User = require('../models/user.model');
const wrapper = require('../utils/wrapper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../auth/secrets');

exports.login = (req, res) => {
    User.findOne({ codigoEmpleado: req.body.codigoEmpleado }, (error, user) => {
        if (error) {
            let response = { "status": "error", "message": "Some error occurred while login the User", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 500, res: res });
        } else if (!user) {
            let response = { "status": "error", "message": "user or password is incorrect", "error": true, "data": undefined };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 401, res: res });
        } else {
            
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                let response = { "status": "error", "message": "User or password is incorrect", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 401, res: res });
            } else {
                                                                                      
            
                let token = jwt.sign({ codigoEmpleado: user.codigoEmpleado, name: user.name, lastName: user.lastName, 
                    nit: user.nit, numeroCuenta: user.numeroCuenta, telefono: user.telefono, email: user.email,
                     nick: user.nick, password: user.password, roles: user.roles}, 
                config.secret, {
                     
                    expiresIn: 86400
                });

                
                let response = { "status": "ok", "message": "User authenticated successfully", "error": false, "data": token };
                return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 200, res: res });
            }
        }
    });

};

exports.logout = (req, res) => {
    let response = { "status": "ok", "message": "Session closed successfully", "error": false, "data": undefined };
    return wrapper.sendResponse({ method: "GET /api/logout", response: response, httpCode: 200, res: res });
};

exports.me = (req, res, next) => {
    User.findById(req.id)
        .then(user => {
            if (!user) {
                let response = { "status": "error", "message": "User not found with id " + req.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/user/" + req.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "User queried successfully", "error": false, "data": user };
                return wrapper.sendResponse({ method: "GET /api/user/" + req.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "User not found with id " + req.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/user/" + req.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving user with id " + req.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/user", response: response, httpCode: 500, res: res });
            }
        });
};
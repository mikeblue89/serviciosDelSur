const express = require('express');
const serverSetup = require('./app/config/server.config');
const mongooseSetup = require('./app/config/mongoose.config');
const backend = require('./app/config/expose.routes.config');


const app = express();
const port = 3001;


serverSetup.configure(app);


mongooseSetup.configure();


serverSetup.checkHealth(app, port);


backend.exposeRoutes(app);


serverSetup.listen(app, port);
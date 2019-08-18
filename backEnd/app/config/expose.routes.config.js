const userRoutes = require('../routes/user.routes');

const backend = {
    exposeRoutes: (app) => {
        
        userRoutes(app);
    }
} 

module.exports = backend;
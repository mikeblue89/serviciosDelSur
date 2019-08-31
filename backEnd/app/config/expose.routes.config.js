const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth.routes');
const productRoutes = require('../routes/product.routes');
const providerRoutes = require('../routes/provider.routes');


const backend = {
    exposeRoutes: (app) => {
        authRoutes(app);
        userRoutes(app);
        productRoutes(app);
        providerRoutes(app);
    }
} 

module.exports = backend;
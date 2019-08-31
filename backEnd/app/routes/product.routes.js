module.exports = (app) => {

    const product = require('../controllers/product.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/product/metadata', verifyToken,  product.metadata);

    app.get('/api/product', verifyToken, product.findAll);

    app.get('/api/product/:id', verifyToken, product.findOneProduct);

    app.post('/api/product', verifyToken, product.create);

    app.put('/api/product', verifyToken, product.update);

    app.delete('/api/product/:id', verifyToken, product.delete);

<<<<<<< HEAD
    app.get('/api/product/:codigoDeBarras', verifyToken, products.findByGivenData);
=======
    app.get('/api/find', verifyToken, product.findByParameter);
>>>>>>> 48da6e22feb19b2bf250fef11667bcaa564e31f7

}
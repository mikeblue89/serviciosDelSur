module.exports = (app) => {

    const products = require('../controllers/product.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/product/metadata', verifyToken,  products.metadata);

    app.get('/api/product', verifyToken, products.findAll);

    app.get('/api/product/:id', verifyToken, products.findOne);

    app.post('/api/product', verifyToken, products.create);

    app.put('/api/product', verifyToken, products.update);

    app.delete('/api/product/:id', verifyToken, products.delete);

    app.get('/api/product/:find', verifyToken, products.findByGivenData);

}
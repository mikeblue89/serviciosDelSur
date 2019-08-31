module.exports = (app) => {

    const provider = require('../controllers/provider.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/provider/metadata', verifyToken,  provider.metadata);

    app.get('/api/provider', verifyToken, provider.findAll);

    app.get('/api/provider/:id', verifyToken, provider.findOneProvider);

    app.post('/api/provider', verifyToken, provider.create);

    app.put('/api/provider', verifyToken, provider.update);

    app.delete('/api/provider/:id', verifyToken, provider.delete);

    app.get('/api/findProvider', verifyToken, provider.findByParameter);

}
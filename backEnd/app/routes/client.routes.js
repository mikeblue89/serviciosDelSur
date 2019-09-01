module.exports = (app) => {

    const client = require('../controllers/client.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/client/metadata', verifyToken,  client.metadata);

    app.get('/api/client', verifyToken, client.findAll);

    app.get('/api/client/:id', verifyToken, client.findOneClient);

    app.post('/api/client', verifyToken, client.create);

    app.put('/api/client', verifyToken, client.update);

    app.delete('/api/client/:id', verifyToken, client.delete);

    app.get('/api/findClient', verifyToken, client.findByParameter);

}
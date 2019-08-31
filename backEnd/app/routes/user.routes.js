module.exports = (app) => {

    const users = require('../controllers/user.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/user/metadata', verifyToken,  users.metadata);

    app.get('/api/user', verifyToken, users.findAll);

    app.get('/api/user/:id', verifyToken, users.findOne);

    app.post('/api/user', verifyToken, users.create);

    app.post('/api/register', users.create);

    app.put('/api/user', verifyToken, users.update);

    app.delete('/api/user/:id', verifyToken, users.delete);

    app.get('/api/search', verifyToken, users.search);


}
module.exports = (app) => {

    const users = require('../controllers/user.controller');
    
    app.get('/api/user/metadata',  users.metadata);

    app.get('/api/user',  users.findAll);

    app.get('/api/user/:id',  users.findOne);

    app.post('/api/user',  users.create);

    app.post('/api/register', users.create);

    app.put('/api/user',  users.update);

    app.delete('/api/user/:id',  users.delete);

}
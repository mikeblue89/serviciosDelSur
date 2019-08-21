module.exports = (app) => {
    const auth = require('../controllers/auth.controller');
    const verifyToken = require('../auth/verifyToken');

    
    app.post('/api/login', auth.login);

    
    app.get('/api/logout', verifyToken, auth.logout);

    
    app.get('/api/me', verifyToken, auth.me);
}
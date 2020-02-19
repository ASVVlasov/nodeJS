const express = require('express');
const authRouter = express.Router();
const passport = require('../services/passport');
const auth = require('../services/auth');

const authController = require('../controllers/authController');

authRouter.use('/registration', auth.mustBeRedirected);
authRouter.get('/registration', (req, res) => {
    res.render('registration');
})
authRouter.post('/registration', authController.Registration);

authRouter.use('/login', auth.mustBeRedirected);
authRouter.get('/login', authController.Login);
authRouter.post('/login', passport.authenticate);
authRouter.get('/logout', authController.Logout);

module.exports = authRouter;
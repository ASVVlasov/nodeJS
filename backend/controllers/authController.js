const User = require('../models/user');
const passport = require('../services/passport');

exports.Registration = async function(req, res) {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json(error);
    }
};

exports.Login = function(req, res) {
    res.render('login');
}

exports.Logout = async function(req, res) {
    req.logout();
    res.render('login');
}
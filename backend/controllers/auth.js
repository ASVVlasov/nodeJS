const User = require('../models/user');
const jwt = require('jsonwebtoken');

class Auth {
    static verifyAuthorization(req, res, next) {
        if (!req.headers.authorization) {
            return res.json({message: 'No token'});
        }
        const token = req.headers.authorization;
        jwt.verify(token, 'secret-phrase', (err, payload) => {
            if (err) {
                return res.json({message: 'wrong token'});
            }
            req.user = payload;
            next();
        })
    }
    static async login(req, res) {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.json({message: 'user is not find'});
        }
        if (!user.comparePassword(password)) {
            return res.json({message: 'wrong password'});
        }
        const plainUser = JSON.parse(JSON.stringify(user));
        delete plainUser.password;
        res.json({
            token: jwt.sign(plainUser, 'secret-phrase')
        });
    }
    static async register(req, res) {
        const {username} = req.body;
        const user = await User.findOne({username});
        if (user) {
            return res.json({message: 'this user is exist'});
        }
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.json({
                token: jwt.sign(newUser, 'secret-phrase')
            });
        } catch (error) {
            res.json({message: error});
        }
    }
}

module.exports = Auth;
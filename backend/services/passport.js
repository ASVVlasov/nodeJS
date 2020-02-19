const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use('local', new Strategy(async (username, password, done) => {
    User.findOne({ username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done('user is not defined!!!', false); }
        if (!user.comparePassword(password)) { return done('password is not correct', false); }
        const plainUser = JSON.parse(JSON.stringify(user));
        delete plainUser.password;
        done(null, plainUser);
      });
}));

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    const plainUser = JSON.parse(JSON.stringify(user));
    delete plainUser.password;

    done(null, plainUser);
});

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    authenticate: passport.authenticate('local', {
        successRedirect: '/tasks',
        failureRedirect: '/login'
    })
}
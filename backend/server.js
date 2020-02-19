const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const consolidate = require('consolidate');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const passport = require('./services/passport');

const settings = {
    PORT: process.env.PORT || 8000,
    HOST: process.env.HOST || 'localhost'
}

mongoose.connect('mongodb://localhost:32771/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

//middlewares
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));
app.use( express.json());
app.use( cookieParser() );
app.use( express.urlencoded( { extended: true } ) );
//app.use( '/', express.static( path.resolve( __dirname, '..', 'front_prod' ) ) );
app.use(session({
    saveUninitialized: false,
    resave: true,
    secret: 'secret phrase',
    store: new mongoStore({mongooseConnection: mongoose.connection}),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
    }
}));
app.use(passport.initialize);
app.use(passport.session);

const router = require('./routes');

app.use(router);

app.listen(settings.PORT, settings.HOST, () => {
    console.log(`Server starts at http://${settings.HOST}:${settings.PORT}`);
})
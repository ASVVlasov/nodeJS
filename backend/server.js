const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:32771/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '..', 'static')));

const router = require('./routes');

app.use(router);

app.listen(8080);
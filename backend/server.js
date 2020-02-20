const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:32771/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const app = express();
const server = http.Server(app);
const io = SocketIO(server);
require('./socket')(io);

app.use(express.json());
app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '..', 'static')));

const router = require('./routes');

app.use(router);

server.listen(8080);
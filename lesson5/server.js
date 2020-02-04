const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:32771/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.set('useFindAndModify', false);

const server = express();

//middlewares
server.use( express.json());
server.use( express.urlencoded( { extended: true } ) );
server.use( '/', express.static( path.resolve( __dirname, 'static' ) ) );

const User = require('./models/user');

server.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

server.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

server.post('/users', async (req, res) => {
    const userSchema = new User(req.body);
    const savedUser = await userSchema.save();
    res.json(savedUser);
})

server.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(user);
})

server.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.json(user);
})

server.listen(8080, () => {
    console.log('Server start at http://localhost:8080/');
})
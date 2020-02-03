const express = require('express');
const mysql = require('mysql');
const config = require('./config');
const pool = mysql.createPool(config);
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

const query = require('./query');

server.get('/', (req, res) => {
    res.redirect('/users');
})
server.get('/users', (req, res) => {
    const sql = mysql.format('SELECT * FROM ??', ['users']);
    query(sql, pool).then((data) => {
        res.send(data);
    }).catch((err) => res.send(err));
})

server.post('/users', (req, res) => {
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const sql = mysql.format('INSERT INTO users (??, ??, ??, ??) VALUES (?, ?, ?, ?)', keys.concat(values));
    console.log(sql);
    query(sql, pool).finally((data) => res.send(data));
})

server.listen(8000, () => {
    console.log('Server start at http://localhost:8000/');
})
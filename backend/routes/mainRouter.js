const express = require('express');
const mainRouter = express.Router();

//CORS
// mainRouter.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//     mainRouter.options('*', (req, res) => {
//         res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
//         res.send();
//     });
// });

mainRouter.get('/', (req, res) => {
    res.redirect('tasks');
})

module.exports = mainRouter;
const express = require('express');
const router = express.Router();

const auth = require('./auth');
const tasks = require('./tasks');
const authController = require('../controllers/auth');

router.use('/auth', auth);
router.use('/tasks', authController.verifyAuthorization);
router.use('/tasks', tasks);

module.exports = router;
const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

router.get('/', auth.verifyAuthorization, (req, res) => {
    res.json(req.user);
});
router.post('/login', auth.login);
router.post('/register', auth.register);

module.exports = router;
const express = require('express');
const router = express.Router();

const tasks = require('../controllers/tasks');

router.get('/', tasks.getTasks);
router.post('/', tasks.addTask);
router.put('/:id', tasks.updateTask);
router.patch('/:id', tasks.patchTask);
router.delete('/:id', tasks.deleteTask);

module.exports = router;
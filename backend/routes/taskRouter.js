const express = require('express');
const taskRouter = express.Router();

const auth = require('../services/auth');
const taskController = require('../controllers/taskController');

taskRouter.use('/tasks', auth.mustBeAuthenticated);
taskRouter.get('/tasks', taskController.getTasks);
taskRouter.post('/tasks', taskController.postTask);
taskRouter.post('/tasks/complete', taskController.putTask);
taskRouter.post('/tasks/delete', taskController.deleteTask);


module.exports = taskRouter;
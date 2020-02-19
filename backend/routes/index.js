const authRouter = require('./authRouter');
const taskRouter = require('./taskRouter');
const mainRouter = require('./mainRouter');

module.exports = [mainRouter, authRouter, taskRouter];
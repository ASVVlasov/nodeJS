const Task = require('../models/task');

exports.getTasks = async function(req, res) {
    const tasks = await Task.find();
    res.render('tasks', {tasks: JSON.parse(JSON.stringify(tasks))});
};

exports.postTask = async function(req, res) {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/tasks');
}

exports.putTask = async function(req, res) {
    await Task.updateOne({_id: req.body.id}, {$set: { completed: true }});
    res.redirect('/tasks');
}

exports.deleteTask = async function(req, res) {
    await Task.deleteOne({_id: req.body.id});
    res.redirect('/tasks');
}
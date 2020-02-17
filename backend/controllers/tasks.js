const Task = require('../models/task');

class Tasks {
    static async getTasks(req, res) {
        const tasks = await Task.find();
        res.json({tasks});
    }
    static async addTask(req, res) {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    }
    static async updateTask(req, res) {
        const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json(task);
    }
    static async patchTask(req, res) {
        const task = await Task.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});
        res.json(task);
    }
    static async deleteTask(req, res) {
        const task = await Task.findByIdAndRemove(req.params.id);
        res.json(task);
    }
}

module.exports = Tasks;
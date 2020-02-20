const Task = require('./models/task');

const changeTask = {
    addTask: async (task) => {
        const savedTask = await new Task(task).save();
        return savedTask
    },
    updateTask: async (task) => {
        const savedTask = await Task.findOneAndUpdate({_id: task._id}, task, {new: true});
        return savedTask;
    },
    patchTask: async (task) => {
        const savedTask =  await Task.findOneAndUpdate({_id: task._id}, {$set: task}, {new: true});
        return savedTask;
    },
    deleteTask: async (task) => {
        await Task.findByIdAndRemove(task._id);
        return task;
    }
}

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log(`someone has connected ${socket.id}`);
        socket.on('changeTask', (message) => {
            const {task, type} = message;
            const newTask = changeTask[type](task);
            newTask.then((value) => {
                socket.broadcast.emit('changeTask', {task: value, type});
                socket.emit('changeTask', {task: value, type});
            })
        })
        socket.on('disconnect', (socket) => {
            console.log(`someone has disconnected`);
        })
    })
}
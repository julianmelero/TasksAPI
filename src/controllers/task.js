// Import Model

const Task = require('../models/task');

async function createTask(req,res) {
    const task = new Task();
    const params = req.body;

    task.title = params.title;
    task.description = params.description;

    try {
        const taskStore = await task.save();

        if(!taskStore) {
            res.status(400).send({ msg: "Don't save"});
        }
        else {
            res.status(201).send({ task: taskStore});
        }


    } catch (error) {
        res.status(500).send(error);
    }
}

async function getTask(req,res) {
    try {
        const tasks = await Task.find({completed: false}).sort({created_at: -1});

        if(!tasks) {
            res.status(400).send({ msg: "Error to get tasks"});
        }
        else {
            res.status(200).send(tasks);
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getATask(req,res) {
    const id = req.params.id;

    try {
        const task = await Task.findById(id);

        if(!task) {
            res.status(400).send({ msg: "Error to get task"});
        }
        else {
            res.status(200).send(task);
        }
        
    } catch (error) {
        res.status(500).send(error);
    }

}

async function updateTask(req,res) {
    const id = req.params.id;
    const params = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, params);
        if(!task) {
            res.status(400).send({ msg: "Error to update task"});
        } else {
            res.status(200).send(task);
        }
    } catch (error) {
        res.status(500).send(error);
    }

}

async function deleteTask(req,res) {
    const id = req.params.id;

    try {
        const task = await Task.findByIdAndRemove(id);
        if(!task) {
            res.status(400).send({ msg: "Error to delete task"});
        } else {
            res.status(200).send(`${id} was deleted!`);
        }
    } catch (error) {
        res.status(500).send(error);
    }

}


module.exports = { 
    createTask,
    getTask,
    getATask,
    updateTask,
    deleteTask
};
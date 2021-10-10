const Task = require('../models/Task');
const asyncWrapper = require('../middleware/wrapper');


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    
    if (!task) { // _id syntax is right but does not match any
        const error = new Error('Task not found');
        error.status = 404;
        return next(error);
    }

    res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
        return res.status(404).json({msg: `No task with id: ${req.params.id}`})
    }

    res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // task will now have the updated object, instead of the old one
        runValidators: true // Validators will be applied before updating
    });

    if (!task) {
        return res.status(404).json({msg: `No task with id: ${req.params.id}`})
    }

    res.status(200).json({ task });
});


module.exports = { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};
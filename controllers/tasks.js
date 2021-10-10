const Task = require('../models/Task');
const asyncWrapper = require('../middleware/wrapper');
const { createCustomError } = require('../errors/custom-error');

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
        return next(createCustomError(`No task with id: ${req.params.id}`, 404));
    }

    res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
        return next(createCustomError(`No task with id: ${req.params.id}`, 404));
    }

    res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // task will now have the updated object, instead of the old one
        runValidators: true // Validators will be applied before updating
    });

    if (!task) {
        return next(createCustomError(`No task with id: ${req.params.id}`, 404));
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
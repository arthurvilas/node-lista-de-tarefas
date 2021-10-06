const { findByIdAndUpdate } = require('../models/Task');
const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });   
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) { // _id syntax is right but does not match any
            return res.status(404).json({msg: `No task with id: ${req.params.id}`})
        }
    
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg:error });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) {
            return res.status(404).json({msg: `No task with id: ${req.params.id}`})
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg:error });
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // task will now have the updated object, instead of the old one
            runValidators: true // Validators will be applied before updating
        });

        if (!task) {
            return res.status(404).json({msg: `No task with id: ${req.params.id}`})
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg:error });
    }
}


module.exports = { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};
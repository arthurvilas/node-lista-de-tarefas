const { application } = require('express');
const express = require('express');
const router = express.Router();

const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');

router.get('/', getAllTasks);       // Get all the tasks
router.post('/', createTask);       // Create a new task 
router.get('/:id', getTask);        // Get a single task
router.patch('/:id', updateTask);   // Update task
router.delete('/:id', deleteTask);  // Delete task

module.exports = router;
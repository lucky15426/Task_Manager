/**
 * Task Routes
 * Defines all API endpoints for task operations
 */

const express = require('express');
const router = express.Router();

// Import task controller functions
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// Route: /api/tasks
// GET  - Get all tasks (supports ?status= filter)
// POST - Create a new task
router.route('/')
    .get(getAllTasks)
    .post(createTask);

// Route: /api/tasks/:id
// GET    - Get a single task by ID
// PUT    - Update a task by ID
// DELETE - Delete a task by ID
router.route('/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;

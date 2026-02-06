/**
 * Task Controller
 * Handles all CRUD operations for tasks
 */

const Task = require('../models/Task');

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 * @access  Public
 */
const getAllTasks = async (req, res) => {
    try {
        // Get optional status filter from query params
        const { status } = req.query;

        // Build query object
        const query = status ? { status } : {};

        // Fetch tasks sorted by creation date (newest first)
        const tasks = await Task.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch tasks',
            error: error.message
        });
    }
};

/**
 * @desc    Get a single task by ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        // Handle invalid ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid task ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch task',
            error: error.message
        });
    }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        // Create new task
        const task = await Task.create({
            title,
            description: description || '',
            status: status || 'Pending'
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to create task',
            error: error.message
        });
    }
};

/**
 * @desc    Update a task
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Find task and update
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task
        });
    } catch (error) {
        // Handle invalid ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid task ID format'
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to update task',
            error: error.message
        });
    }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: {}
        });
    } catch (error) {
        // Handle invalid ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid task ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to delete task',
            error: error.message
        });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};

/**
 * Task Model Schema
 * Defines the structure for task documents in MongoDB
 */

const mongoose = require('mongoose');

// Define the Task Schema
const taskSchema = new mongoose.Schema({
    // Task title - required field
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },

    // Task description - optional field
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: ''
    },

    // Task status - enum with predefined values
    status: {
        type: String,
        enum: {
            values: ['Pending', 'In Progress', 'Completed'],
            message: '{VALUE} is not a valid status'
        },
        default: 'Pending'
    },

    // Timestamp when task was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

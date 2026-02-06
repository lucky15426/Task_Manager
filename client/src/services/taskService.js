/**
 * Task API Service
 * Handles all API calls to the backend server
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch all tasks from the server
 * @param {string} status - Optional status filter
 * @returns {Promise<Array>} Array of task objects
 */
export const getAllTasks = async (status = '') => {
    try {
        const url = status
            ? `${API_BASE_URL}/tasks?status=${encodeURIComponent(status)}`
            : `${API_BASE_URL}/tasks`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch tasks');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

/**
 * Fetch a single task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object>} Task object
 */
export const getTaskById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch task');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
};

/**
 * Create a new task
 * @param {Object} taskData - Task data { title, description, status }
 * @returns {Promise<Object>} Created task object
 */
export const createTask = async (taskData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create task');
        }

        return data.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

/**
 * Update an existing task
 * @param {string} id - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} Updated task object
 */
export const updateTask = async (id, taskData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update task');
        }

        return data.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

/**
 * Delete a task
 * @param {string} id - Task ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete task');
        }

        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

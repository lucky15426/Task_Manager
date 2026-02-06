/**
 * TaskForm Component
 * Reusable form for creating and editing tasks
 */

import { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSubmit, onCancel, isLoading }) => {
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending'
    });

    // Error state for validation
    const [errors, setErrors] = useState({});

    // Populate form when editing an existing task
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'Pending'
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'Pending'
            });
        }
        setErrors({});
    }, [task]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title cannot exceed 100 characters';
        }

        if (formData.description.length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="form-overlay">
            <div className="task-form-container">
                <div className="form-header">
                    <h2>{task ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
                    <button
                        className="close-btn"
                        onClick={onCancel}
                        aria-label="Close form"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="task-form">
                    {/* Title Field */}
                    <div className="form-group">
                        <label htmlFor="title">
                            Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter task title..."
                            className={errors.title ? 'error' : ''}
                            autoFocus
                        />
                        {errors.title && (
                            <span className="error-message">{errors.title}</span>
                        )}
                    </div>

                    {/* Description Field */}
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter task description (optional)..."
                            rows="4"
                            className={errors.description ? 'error' : ''}
                        />
                        {errors.description && (
                            <span className="error-message">{errors.description}</span>
                        )}
                        <span className="char-count">
                            {formData.description.length}/500
                        </span>
                    </div>

                    {/* Status Field */}
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Pending">🟠 Pending</option>
                            <option value="In Progress">🔵 In Progress</option>
                            <option value="Completed">🟢 Completed</option>
                        </select>
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    {task ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                task ? 'Update Task' : 'Create Task'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;

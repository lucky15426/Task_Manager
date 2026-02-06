/**
 * TaskList Component
 * Displays all tasks with filtering and loading states
 */

import { useState } from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, loading, error, onEdit, onDelete, filter, onFilterChange }) => {
    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Status filter options
    const filterOptions = [
        { value: '', label: 'All Tasks' },
        { value: 'Pending', label: '🟠 Pending' },
        { value: 'In Progress', label: '🔵 In Progress' },
        { value: 'Completed', label: '🟢 Completed' }
    ];

    // Filter tasks based on status AND search query
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filter === '' || task.status === filter;
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Loading state
    if (loading) {
        return (
            <div className="task-list-loading">
                <div className="loading-spinner"></div>
                <p>Loading tasks...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="task-list-error">
                <span className="error-icon">⚠️</span>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button className="btn-retry" onClick={() => window.location.reload()}>
                    🔄 Retry
                </button>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            {/* Filter and Search Bar */}
            <div className="toolbar">
                <div className="search-group">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
                    )}
                </div>

                <div className="filter-group">
                    <label htmlFor="status-filter">Status:</label>
                    <select
                        id="status-filter"
                        value={filter}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="filter-select"
                    >
                        {filterOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="list-stats">
                <p className="task-count">
                    {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                </p>
            </div>

            {/* Empty state */}
            {filteredTasks.length === 0 ? (
                <div className="task-list-empty">
                    <span className="empty-icon">📋</span>
                    <h3>No tasks found</h3>
                    <p>
                        {searchQuery
                            ? `No results for "${searchQuery}". Try a different search.`
                            : filter
                                ? `No tasks with status "${filter}".`
                                : 'Get started by creating your first task!'
                        }
                    </p>
                </div>
            ) : (
                /* Task Grid */
                <div className="task-grid">
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;

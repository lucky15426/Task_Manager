/**
 * TaskCard Component
 * Displays individual task information with edit and delete actions
 */

import './TaskCard.css';

// Status badge color mapping
const statusColors = {
    'Pending': 'status-pending',
    'In Progress': 'status-progress',
    'Completed': 'status-completed'
};

const TaskCard = ({ task, onEdit, onDelete }) => {
    const { title, description, status, createdAt } = task;

    // Format the creation date
    const date = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Get dynamic class for status
    const statusClass = status.toLowerCase().replace(' ', '-');

    return (
        <div className={`task-card ${statusClass}`}>
            <div className="task-header">
                <span className={`status-badge ${statusColors[status]}`}>
                    {status}
                </span>
                <div className="task-actions">
                    <button
                        className="btn-icon-only btn-edit"
                        onClick={() => onEdit(task)}
                        title="Edit Task"
                    >
                        ✏️
                    </button>
                    <button
                        className="btn-icon-only btn-delete"
                        onClick={() => onDelete(task._id)}
                        title="Delete Task"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <h3 className="task-title">{title}</h3>
            <p className="task-desc">{description}</p>

            <div className="task-footer">
                <div className="task-date">
                    <span>📅</span>
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;

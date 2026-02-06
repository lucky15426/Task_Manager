/**
 * Main Application Component
 * Task Management Application Entry Point
 */

import { useState, useEffect, useCallback } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoadingScreen from './components/LoadingScreen';
import * as taskService from './services/taskService';
import './App.css';

function App() {
  // Application state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minLoading, setMinLoading] = useState(true); // Buffer for loading screen
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  // Set a minimum buffer time for the professional loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoading(false);
    }, 2000); // 2 second buffer
    return () => clearTimeout(timer);
  }, []);

  // Form modal state
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /**
   * Fetch all tasks from the API
   */
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks(filter);
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Fetch tasks on mount and when filter changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Handle opening the add task form
   */
  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  /**
   * Handle opening the edit task form
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  /**
   * Handle form submission (create or update)
   */
  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (editingTask) {
        // Update existing task
        const updatedTask = await taskService.updateTask(editingTask._id, formData);
        setTasks(prev =>
          prev.map(task => task._id === editingTask._id ? updatedTask : task)
        );
      } else {
        // Create new task
        const newTask = await taskService.createTask(formData);
        setTasks(prev => [newTask, ...prev]);
      }

      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      alert(err.message || 'Operation failed. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  /**
   * Handle task deletion
   */
  const handleDeleteTask = async (taskId) => {
    if (deleteConfirm !== taskId) {
      setDeleteConfirm(taskId);
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      setDeleteConfirm(null);
    } catch (err) {
      alert(err.message || 'Failed to delete task');
    }
  };

  /**
   * Handle closing the form modal
   */
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  /**
   * Handle filter change
   */
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Show Loading Screen during initial fetch or buffer time
  if (minLoading || (loading && tasks.length === 0)) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="container header-container">
          <div className="header-title">
            <div className="header-icon-box">📋</div>
            <h1>TaskFlow <span className="title-dash">/</span> Dash</h1>
          </div>

          <div className="header-actions">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-login">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="header-controls">
                <button className="btn-add-task" onClick={handleAddTask}>
                  <span>➕</span> Add New Task
                </button>
                <div className="user-profile">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          <SignedOut>
            <div className="welcome-hero">
              <div className="hero-badge">Productivity Reinvented</div>
              <h1>Master your day, one task at a time.</h1>
              <p>Seamlessly manage your projects with our premium dashboard. Track progress, collaborate, and achieve your goals with ease.</p>
              <div className="hero-features">
                <div className="feature">✦ Smart Filtering</div>
                <div className="feature">✦ Real-time Updates</div>
                <div className="feature">✦ Secure by Clerk</div>
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            {/* Dashboard Stats */}
            <div className="dashboard-stats">
              <div className="stat-card">
                <span className="stat-label">Total Tasks</span>
                <span className="stat-value">{tasks.length}</span>
                <div className="stat-progress p-total"></div>
              </div>
              <div className="stat-card">
                <span className="stat-label">In Progress</span>
                <span className="stat-value">
                  {tasks.filter(t => t.status === 'In Progress').length}
                </span>
                <div className="stat-progress p-progress"></div>
              </div>
              <div className="stat-card">
                <span className="stat-label">Completed</span>
                <span className="stat-value">
                  {tasks.filter(t => t.status === 'Completed').length}
                </span>
                <div className="stat-progress p-completed"></div>
              </div>
            </div>

            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              filter={filter}
              onFilterChange={handleFilterChange}
            />
          </SignedIn>
        </div>
      </main>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          isLoading={formLoading}
        />
      )}

      {/* Delete Confirmation Toast */}
      {deleteConfirm && (
        <div className="delete-toast">
          <p>Click delete again to confirm</p>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>Task Management App © 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

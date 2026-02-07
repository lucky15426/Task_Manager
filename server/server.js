/**
 * Express Server Entry Point
 * Task Management API Server
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables from the root folder
dotenv.config({ path: path.join(__dirname, '../.env') });

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Enable CORS
const allowedOrigins = [
    'http://localhost:5173',
    'https://task-manager-xi-plum.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/tasks', taskRoutes);

// Root route - API health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Task Management API is running',
        version: '1.0.0',
        endpoints: {
            tasks: '/api/tasks',
            singleTask: '/api/tasks/:id'
        }
    });
});

// 404 Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`
  ======================================
   Task Management API Server
  ======================================
   Status:  Running
   Port:    ${PORT}
   Mode:    ${process.env.NODE_ENV || 'development'}
  ======================================
  `);
});

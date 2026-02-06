/**
 * MongoDB Database Connection Configuration
 * Handles connection to MongoDB using Mongoose
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses MONGODB_URI environment variable or defaults to local MongoDB
 */
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';

        const conn = await mongoose.connect(mongoURI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

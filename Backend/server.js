const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Cache MongoDB connection across serverless function invocations
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set in Vercel / .env");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging indefinitely
    });
    cachedConnection = conn;
    console.log("MongoDB connected successfully...");
    return conn;
  } catch (err) {
    console.error("Database connection error: ", err.message);
    throw err;
  }
};

// Ensure database connection is established before processing API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
      next();
    } catch (err) {
      return res.status(500).json({
        msg: `Backend Database Connection Error: ${err.message}. Please verify your MongoDB Atlas Network Access whitelist (0.0.0.0/0) and Vercel MONGO_URI environment variable.`
      });
    }
  } else {
    next();
  }
});

// Middleware
app.use(cors({
    origin: (origin, callback) => {
      // Allow requests from localhost, netlify, vercel, or server-to-server (no origin)
      if (!origin || origin.includes("localhost") || origin.includes("netlify.app") || origin.includes("vercel.app")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/budgets', require('./routes/budgets'));
app.use('/api/expenses', require('./routes/expense'));

// Basic Route for testing
app.get('/', (req, res)=> {
    res.send("Expense Tracker API is running...");
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
}

module.exports = app;
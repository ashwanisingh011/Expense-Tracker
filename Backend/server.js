const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://expense-trakker.netlify.app"]
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/budgets', require('./routes/budgets'));
app.use('/api/expenses', require('./routes/expense'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log("Database connection error: ", err))

// Basic Route for testing
app.get('/', (req, res)=> {
    res.send("Expense Tracker API is running...");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
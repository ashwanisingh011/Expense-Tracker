const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true 
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Expense", ExpenseSchema);
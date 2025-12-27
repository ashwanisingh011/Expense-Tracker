import mongoose ,{Schema} from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true 
    },
    amount: {
        type: Number,
        require: true 
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {timestamps: true});

export const Expense = mongoose.model('Expense', ExpenseSchema);
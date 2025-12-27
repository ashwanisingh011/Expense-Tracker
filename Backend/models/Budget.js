import mongoose ,{Schema} from 'mongoose';

const BudgetSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true 
    },
    amount: {
        type: Number,
        require: true 
    },
    color: {
        type: String,
        require: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {timestamps: true});

export const Budget = mongoose.model('Budget', BudgetSchema)
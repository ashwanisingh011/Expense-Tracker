import mongoose ,{Schema} from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  
}, {timestamps: true});

export const User = mongoose.model('User', UserSchema);
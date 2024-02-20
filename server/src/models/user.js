import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    todo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo",
    },
    createdAt: {
        type: Date,
        default: Date.now // Corrected syntax here
    }
});

const User = mongoose.model('User', userSchema);

export default User;

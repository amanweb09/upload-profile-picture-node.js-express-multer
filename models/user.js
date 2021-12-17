const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    profilePicture: {
        type: String,
        required: false,
        unique: true
    }
})

const User = new mongoose.model('users', userSchema);

module.exports = User;
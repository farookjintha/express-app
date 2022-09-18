const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        required: "Email is mandatory"
    },
    mobileNumber: {
        type: Number
    },
    hashedPassword: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("User", userSchema);
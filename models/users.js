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
        type: Number,
        required: true,
    },
    alternateNumber: {
        type: Number
    },
    flag: {
        type: Number,
        default: 0
    },
    dob: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');

const quotesSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("Quotes", quotesSchema);
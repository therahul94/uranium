const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        unique: true
    },
    emailId: { type: String, required: true},
    password: { type: String, required: true},
    gender: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    age: Number

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    category: String,
    year: Number
});

module.exports = mongoose.model('Book', bookSchema) //books
const bookDetails = require('../models/userModel');

const addBook = async function(req, res){
    let data = req.body
    let savedData = await bookDetails.create(data)
    res.send(savedData)
}

const allBooks = async function(req, res){
    let getBookData = await bookDetails.find()
    res.send({BookDetails: getBookData})
}

module.exports.addBook = addBook;
module.exports.allBooks = allBooks;
const bookModel = require("../models/bookModel");
const authorModel = require('../models/authorModel');
const publisherModel = require("../models/publisherModel");

const createBook = async function(req, res){
    let data = req.body
    
    if(data.author && data.publisher){
        
        let authorValidation = await authorModel.findById({_id: data.author})  // checking that the given id inside data.author belongs from newAuthor collection or not.
        let publisherValidation = await publisherModel.findById({_id: data.publisher}) // checking that the given id inside data.publisher belongs from newPublisher collection or not.

// ***NOTES: findById() function can be replaced by exist() function, findById() only takes the ObjectId whereas the 
// exist() can take any type of argument

        if (authorValidation){
            if(publisherValidation){
                let savedData = await bookModel.create(data)       
                res.send(savedData)
            }
            else{res.send(" publisher is not present ")}
        }
        else{res.send("Author is not present.")}
    }
    else{res.send("this detail is required")}

}

const getBookDetails = async function(req, res){
    const data = await bookModel.find().populate('author').populate('publisher')
    res.send(data)
}

const updatedValues = async function(req, res){
    let publisherData = await publisherModel.find({
        $or:[{name: {$eq:'Penguin'}}, {name:{$eq:'Harper Collins'}}]
    }).select({_id:1})

    let savedData = null
    let savedData2 = null

    for (let i=0; i<publisherData.length; i++){
        savedData = await bookModel.updateMany(
            {publisher: publisherData[i]._id},
            {$set:{isHardCover: true}}
        )
    }

    let authorData = await authorModel.find({rating: {$gt: 3.5}}).select({_id:1})
    for (let i=0;i<authorData.length;i++){
        savedData2 = await bookModel.updateMany(
            {author:authorData[i]._id},
            {$inc:{price: 10}}
        )
    }
    
    res.send({first:savedData, second:savedData2})

}

module.exports.createBook = createBook 
module.exports.getBookDetails = getBookDetails
module.exports.updatedValues = updatedValues
const blogsModel = require('../models/blogsModel')
const authorModel = require('../models/authorModel')

const createBlogs = async function (req, res) {
    
    try {
        let { title, body , authorId, category, subcategory} = req.body
        
        if (!( title && body && authorId  && category  && subcategory)) {
            return res.status(400).send({ status: false, data: "All fields are required" })
        }
        let validAuthorId = await authorModel.findById(authorId)
        console.log(validAuthorId)

        if (!validAuthorId) {
            return res.status(409).send({ status: false, data: "Author not exist." })
        }

        let dataBlogs = await blogsModel.create(req.body)
        console.log("done ")

        if(req.body.isPublished === true){
            dataBlogs.publishedAt = new Date()
            dataBlogs.save()
        }

        return res.status(201).send({ status: true, data: dataBlogs })
    } 
    catch (err) {
        return res.status(500).send({ status: false, err: err })
    }

}



module.exports.createBlogs = createBlogs 


const author = require("../models/authorModel")
const Blogs = require("../models/blogsModel")
var jwt = require('jsonwebtoken');


let authrAuth = async function (req, res, next) {

    let token = req.headers["x-api-key"]
    let authordata = jwt.verify(token, "functionUpgroupnumber32")

    console.log(authordata)
    if (!authordata) {
        return res.status(404).send({ status: true, msg: "token is not valid" })
    }
    console.log(authordata)


    let blogId = req.params.blogId
    let requestedAuthorId = null

    if (blogId){
        let validBlog = await Blogs.findById(blogId)
        requestedAuthorId = validBlog.authorId
    }
    else{
        requestedAuthorId = req.query.authorId
    }
    console.log(requestedAuthorId)

    if (authordata.authorId != requestedAuthorId) {
        return res.status(403).send({ status: true, msg: "Not Valid Author" })
    }


    next()
}

module.exports = { authrAuth }




// let Id = req.params.userId

// // mongoose.isValidObjectId(Id) is checking that the given userId following proper id format or not if it doesnot follow then it will show the ERROR that UserId's format is wrong.
// if (!mongoose.isValidObjectId(Id)) {
//     res.status(400).send({ status: false, msg: "UserId's format is wrong." })
// }

// // if(!isIdFromValidCollection) is checking that the provided id belongs to the specified collection or not, if not then condition becomes true and show the ERROR.
// let isIdFromValidCollection = await userModel.findById(Id)
// if(!isIdFromValidCollection){
//     return res.status(400).send({msg: "ERROR: Provided Id does not belongs to specified collection."})
// }
// //we are taking this x-auth-token in header
// //if case is different like x-Auth-Token in header then we use this condition
// //if any of the header x-auth-token or x-Auth-Token is present then it will store the value inside my token variable.
// let token = req.headers["x-auth-token"]
// if (!token) { token = req.headers["x-Auth-Token"] }

// //this condition is checking whether the token is present or not ,if not then sending the ERROR msg.
// if (!token) {
//     return res.status(400).send({ status: false, msg: "token must be present" })
// }

// // It is verifying the given token in header is generated from this srcret or not. if not then catch block will run respond the ERROR msg.
// // If the token is verified then the decodedToken have the values in key value format example
// // {
// //     userId: '6261911ecd3f3366aa8bf1a5',
// //     name: 'Pritesh',
// //     iat: 1650611962
// // }
// // these are the specification which we have mentioned inside the payload when we created the token using the jwt.sign().

// // In this case if COMPILATION ERROR OR SERVER ERROR will occur then only it will go to the catch block.
// let decodedToken = jwt.verify(token, "jamesBond")

// //In the requestedUserId we have the Id which is being requested i.e. the Id present in the path params


// // we are checking that the the person who logged In has the userId in the decodedToken is equal to the Id. If matches means he/she is trying to access their own data which is completely fine.But if it doesnot match that means the loggedIn user requested for other users feed, so he/she cannot get permission for that hence it will show the Error that You are not authorized person to perform the requested action!!!
// if (decodedToken["userId"] != Id) {
//     return res.status(403).send({
//         status: false, msg: "You are not authorized person to perform the requested action!!!"
//     })
// }

// //the requested Id which is pointing to some Account is deleted or not if the requested account is deleted then It will show the ERROR that you are requesting for Deleted Account.
// let Account = await userModel.findById(Id)
// let isDeleted = Account["isDeleted"]
// if(!isDeleted) {
//     next()
// }
// else{
//     return res.status(400).send({msg: "Requesting for Deleted Account"})
// }

// }
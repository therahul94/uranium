const jwt = require('jsonwebtoken')

const mid1 = async function(req, res, next){
    let token = req.headers["X-Api-Key"]
    if(!token){
        token = req.headers["x-api-key"]
    }

    if(!token){
        return res.status(400).send({status: false, msg: "please fill token field"})
    }

    // console.log(token)

    decodeToken = jwt.verify(token, 'functionUpgroupnumber32')

    if(!decodeToken){
        return res.status().send({status: false, msg: "Token is not Valid."})
    }

    // let authorToBeModified = req.params.authorId

    // let authorLoggedIn = decodeToken.authorId

    // if(authorToBeModified != authorLoggedIn ){
    //     return res.send({status: false, msg: "requested user is not authorized."})
    // }

    next()
}

module.exports.mid1 = mid1
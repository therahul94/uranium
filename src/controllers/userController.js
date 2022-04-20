
const UserModel = require('../models/userModel')


const basicDetails = function(req, res){
    const token = req.headers.token
    console.log (token)
    console.log("I am inside the route handler.")
    res.send("You are receiving this response from handler...")

}










const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.basicDetails= basicDetails
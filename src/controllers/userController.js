const req = require("express/lib/request")
const UserModel= require("../models/userModel")



const userDetailes = async function(req, res){
    const Data = req.body
    const savedData = await UserModel.create(Data)
    res.send(savedData)
}

module.exports.userDetailes = userDetailes
















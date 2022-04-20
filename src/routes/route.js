const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require('../middlewares/commonMiddlewares')


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/createBook", BookController.createBook  )


const mid1 = function (req, res, next){
    let loggedIn = true
    if(loggedIn){
        console.log("You are logged In")
        next()
    }
    else{
        console.log("Authentication Failed")
    }
}

router.get("/basicRoute", mid1, commonMW.Mid1, commonMW.Mid2,  UserController.basicDetails)



module.exports = router;
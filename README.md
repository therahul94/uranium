# Next() :
- it is a callback function in a middleware
- it passses the control to the subsequent function
- if next () is missed, the control flow will hang

<!-- TYPES OF MIDDLEWARE: -->
# Route based Middlewares
# Global Middlewares

<!-- WHY Middleware -->
- manages the flow of control
- code reusability esp for restrivted routes

<!-- WHAT -->
- sit between your router and your HANDLER

<!-- e.g. -->
router.post('/getHomePage' , MiddlewareIfLoggedIn,  UserController.homePage)
 
function MiddlewareIfLoggedIn( req, res, next) {
    if loggedIn then call the next fucntion/handler which will give us the home page feeds
    else res.send( " please login or register")
 }


<!--  e.g. restricted and open-to-all API's can be handled like below now: -->
# restricted API's
 router.get('/homePage', mid1, UserController.feeds)
 router.get('/profileDetails', mid1, UserController.profileDetails)
 router.get('/friendList', mid1, UserController.friendList)
 router.get('/changePassword', mid1, UserController.changePassword)

# OPen-to-all API's
 router.get('/termsAndConditions',  UserController.termsAndConditions)
 router.get('/register',  UserController.register)


<!-- GLOBAL MW -->
app.use( midGlobal)

# body-parser functions:
- getting the post data in req.body
- getting the req.body data as JSON 
- providing the header data in req.header
etc etc

<!-- JWT BASIC INTRO OF FLOW -->
<!-- // LOGIN FLOW -->

you punch your userName and password 
if correct you get loggedIn...


<!-- WITHOUT JWT: -->
next time you call an api to get your FB friendList..FB should ask you for a login again ( BUT this does not happen in real life)

after 30 mins..you try to access your profile page..ideally FB should ask you to login again..BUT this does not happen in real life

<!-- WITH JWT -->
you punch your userName and password ..FB will craete a unique secret token( unique to every user) and send it to the browser..Chrome will save this token in its storage
next time I want to acess my friendList..chrome(frontend) will send this token ( already stored in chrome storage) to the API..this API will first call a Middleware which will verify if the token is correct and who does it belong to..if token is correct then we will send the friend list of the concerned person..else send not authorised

next time when you request your profile page..token is checked ..if correct you get your profile page, else "not authorised"

intro

<!-- ASSIGNMENT:- -->
Write a middleware that logs (console.log) some data everytime any API is hit
Data to be logged:-the current timestamp(as date time) , the IP of the user and the route being requested).
For this first figure out how to get the route location being requested, how to get current timestamp and how to get the IP.
NOTE: ip of local computer will come as ::1 so dont get disturbed by seeing this)

e.g: you should be logging something like this on each line:
time , IP, Route should be printed on each line in terminal( every time an api is hit)
2010-08-19 14:00:00 , 123.459.898.734 , /createUser
2010-08-19 14:00:00 , 123.459.898.734 , /basicAPi
2010-08-19 14:00:00 , 123.459.898.734 , /falanaAPI


<!-- route.js -->
const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/createBook", BookController.createBook  )




// router.post("/createUser", UserController.createUser  )
// router.get("/getUsersData", UserController.getUsersData)


// const mid1= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid1")
//     // logic
//     let loggedIn = false

//     if (loggedIn== true) { 
//         console.log( "OK LOGGED IS IS TRUE NOW")
//         next ()
//     }
//     else {
//         res.send ("Please login or register")
//     }
// }

// // e.g. restricted and open-to-all API's can be handled like below now:
// router.get('/homePage', mid1, UserController.feeds)
// router.get('/profileDetails', mid1, UserController.profileDetails)
// router.get('/friendList', mid1, UserController.friendList)
// router.get('/changePassword', mid1, UserController.changePassword)

// router.get('/termsAndConditions',  UserController.termsAndConditions)
// router.get('/register',  UserController.register)





router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, UserController.basicCode)



// router.get("/basicRoute2", commonMW.mid1, UserController.basicCode2)
// router.get("/basicRoute3", commonMW.mid2, UserController.basicCode3)
// router.get("/basicRoute4", commonMW.mid1, commonMW.mid4, UserController.basicCode4)




module.exports = router;

<!-- index.js -->

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );

<!-- commonMiddleware.js -->

const mid1= function ( req, res, next) {
    req.falana= "hi there. i am adding something new to the req object"
    console.log("Hi I am a middleware named Mid1")
    next()
}

const mid2= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid2")
    next()
}

const mid3= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid3")
    next()
}

const mid4= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid4")
    next()
}

module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid4= mid4


<!-- userController.js -->

const UserModel= require("../models/userModel")




const basicCode= async function(req, res) {
    let tokenDataInHeaders= req.headers.token
    console.log(tokenDataInHeaders)

    console.log( "HEADER DATA ABOVE")
    console.log( "hey man, congrats you have reached the Handler")
    res.send({ msg: "This is coming from controller (handler)"})
    }


const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weatherController = require('../controllers/weatherController')
const memeController = require('../controllers/memeController')




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date
router.get("/cowin/getAllDistrict", CowinController.getAllDist)
router.get("/weather/getTemparature", weatherController.getTempOfCities)
router.get("/weather/sortUsingTemp", weatherController.tempWiseSort)

router.get("/memes/getAllMemes", memeController.getAllMemes)
router.post("/memes/createMemes", memeController.createMemes)


module.exports = router;
const express = require('express');
const logger = require('../logger/logger.js')
const help = require('../util/helper.js')
const strR = require('../validator/formatter.js')
const _ = require('lodash')
const router = express.Router();


router.get('/test-me', function (req, res) {
    logger.logging()
    help.Date()
    help.Month()
    help.BatchInfo()
    strR.Trim()
    strR.lowerCase()
    strR.upperCase()
});

router.get('/hello', function(req,res){
    let monthArr = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "Octuber", "November", "December"]
    console.log(_.chunk(monthArr,3))

    let oddNoArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    console.log(_.tail(oddNoArr))

    console.log(_.union([2, 4, 6], [2,6,90], [2,45], [2,6,90,45], [2,6,90,74]))

    let objList = [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
    console.log(_.fromPairs(objList))

});

module.exports = router;
// adding this comment for no reason
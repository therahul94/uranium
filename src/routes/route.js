const express = require('express');
const logger = require('./logger')

const router = express.Router();

nameArr = ["abv","knsdn","al","slsk","nvn","oeou","jskj","nkjvdsnkh","ssfddfs","shfd"]

router.get('/all-candidates', function (req, res) {
    res.send(nameArr)
});

router.get('/candidates', function (req, res) {
    let number = req.query.count
    let resultArr = []
    for (let i = 0; i<number; i++){
        resultArr.push(nameArr[i])
    }
    res.send(resultArr)
});



module.exports = router;
// adding this comment for no reason
const express = require('express');
const logger = require('./logger')

const router = express.Router();

//problem 1)
let movieList = ["Gangs of wasseypur", "Hachi: A dog's tale", "shawshank redemption", "When I first met", "Dhol"]
router.get('/movies',function(req, res){
    res.send(movieList)
})

// problem 2) & 3)

router.get('/movies/:indexNumber', function(req, res){
    let i = req.params.indexNumber
    if((i < 5) && (i >= 0)){
        res.send(movieList[i])
    }
    else{
        res.send("ERROR : \"Invalid index\"")
    }
})

let moviesArr = [ {
    id: 103,
    name: 'The Shining'
   }, {
    id: 22,
    name: 'Incendies'
   }, {
    id: 367,
    name: 'Rang de Basanti'
   }, {
    id: 408,
    name: 'Finding Nemo'
   }]
   
// problem 4)
router.get('/films', function(req, res){
    res.send(moviesArr)
})

// problem 5)

router.get('/films/:filmId', function (req, res) {
    let getId = req.params.filmId    //{filmId: 3}
    let count = 0
    for (let i=0; i<moviesArr.length;i++){
        if (getId == moviesArr[i].id){
            res.send(moviesArr[i])
        }
        else{
            count += 1
        }
    }
    if(count>0){
        res.send("No movie exists with this id")
    }
});




module.exports = router;
// adding this comment for no reason
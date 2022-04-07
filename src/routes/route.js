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
    id: 1,
    name: 'The Shining'
   }, {
    id: 2,
    name: 'Incendies'
   }, {
    id: 3,
    name: 'Rang de Basanti'
   }, {
    id: 4,
    name: 'Finding Nemo'
   }]
   
// problem 4)
router.get('/films', function(req, res){
    res.send(moviesArr)
})

// problem 5)

router.get('/films/:filmId', function (req, res) {
    let getId = req.params.filmId

    if ((getId > 0) && (getId < 5)){
        for (let i=0; i<moviesArr.length; i++){
            if(moviesArr[i].id == getId){
                res.send(moviesArr[i])
            }
        }
    }
    else{
        res.send('No movie exists with this id')
    }
});




module.exports = router;
// adding this comment for no reason
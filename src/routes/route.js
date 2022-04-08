const express = require('express');

const router = express.Router();


let players = [
    {
        name : "manish",
        dob : "1/1/1995",
        gender : "male",
        city : "jalandhar",
        sports : ["swimming"]
    },
    {
        name: "gopal",
        dob: "1/09/1995",
        gender: "male",
        city: "delhi",
        sports: ["soccer"]
    },
    {
        name: "lokesh",
        dob: "1/1/1990",
        gender: "male",
        city: "mumbai",
        sports: ["soccer"]
    },

]

router.post('/players', function(req, res){
    let inputPlayerName = req.body.name
    let count = 0
    for (let i in players){
        if (players[i].name == inputPlayerName){
            break
        }   // console.log(playerDetails)
        else{
            count++
        }
    }
    if(count == players.length){
        players.push(req.body)
    }
    res.send({data : players, status : true})
    
})


module.exports = router;

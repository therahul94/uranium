const mid = function(req, res, next){
    // console.log(typeof isFreeAppUser)
    req['isFreeAppUser'] = req.headers.isfreeappuser
    if(req['isFreeAppUser']){
        next()
    }
    else{
        res.send("Error:  Request is missing a mandatory header")
    }
}

module.exports.mid = mid
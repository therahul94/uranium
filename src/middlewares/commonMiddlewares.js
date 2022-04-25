const mid = function(req, res, next){
    // console.log(typeof isFreeAppUser)
    // req['isFreeAppUser'] = req.headers.isfreeappuser
    // if(req['isFreeAppUser']){
    //     next()
    // }
    // else{
    //     res.send("Error:  Request is missing a mandatory header")
    // }


    req['isFreeAppUser'] = req.headers.isFreeAppUser
    if (!req['isFreeAppUser']) { 
       req['isFreeAppUser'] =  req.headers.isfreeappuser
    }


    if( req['isFreeAppUser'] ){

        if(req['isFreeAppUser'] === 'true') {
            req['isFreeAppUser'] = true
        }
        else{
            req['isFreeAppUser'] = false
        }
        next()
        
    }
    else{
        res.status(400).send({ msg: "ERROR!!! Request is missing a mandatory header." })
    }
}

module.exports.mid = mid
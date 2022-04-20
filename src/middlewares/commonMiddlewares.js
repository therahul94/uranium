const Mid1 =  function(req, res, next){
    console.log("You are inside the middleware1")
    next()
}

const Mid2 = function(req, res, next){
    console.log("You are inside the middleware2")
    next()
}

const globalMW = function(req, res, next){
    console.log("I am inside the global function")
    next()
}

module.exports.Mid1 =  Mid1
module.exports.Mid2 = Mid2
module.exports.globalMW = globalMW
const printDate = function(req, res){
    let date  = new Date()
    //getDate() is a function used to access the date.
    console.log("Date is:",date.getDate())
}

const printMonth = function(req, res){
    let date  = new Date()
    //we are doing +1 because getMonth start from january as 0.
    console.log("Month is:",date.getMonth()+1)
}

const getBatchInfo = function(req, res){
    console.log("Batch Info: Uranium"," W3D1","the topic being taught today is Nodejs module system")
}
module.exports.Date = printDate
module.exports.Month = printMonth
module.exports.BatchInfo = getBatchInfo
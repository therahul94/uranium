const batchModel = require('../models/batchModel')
const developerModel = require('../models/developerModel')

const createDeveloper = async function(req, res){
    const data = req.body
    const savedData = await developerModel.create(data)
    res.send(savedData)
}

const fetchDevelopers = async function(req, res){
    const fetchedData = await developerModel.find({gender: "female", percentage: {$gte: 75}})
    res.send(fetchedData)
}

const getDevelopers = async function(req, res){
    const percent = req.query.percentage
    const batchName = req.query.program

    const idDetails = await batchModel.find({name: batchName}, {_id:1})  //I used projection here.
    // res.send(idDetails)
    const data = await developerModel.find({batch: idDetails, percentage: {$gte: percent}}).populate('batch')
    res.send(data)
}

module.exports.createDeveloper = createDeveloper
module.exports.fetchDevelopers = fetchDevelopers
module.exports.getDevelopers = getDevelopers
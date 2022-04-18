const batchModel = require("../models/batchModel")

const createBatch = async function(req, res){
    const data = req.body
    const batchData = await batchModel.create(data)
    res.send(batchData)
}

module.exports.createBatch = createBatch
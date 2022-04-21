const productModel = require('../models/productModel')

const productDetails = async function (req, res){

    let Data = req.body
    let savedData = await productModel.create(Data)
    res.send(savedData)

}

module.exports.productDetails = productDetails
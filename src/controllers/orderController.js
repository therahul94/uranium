const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
const productModel = require('../models/productModel')

const orderDetails = async function (req, res){

    let userId = req.body.userId
    let productId = req.body.productId

    let userIdValidation = await userModel.findById(userId,{_id:1})
    let productIdValidation = await productModel.findById(productId,{_id:1})

    if(userIdValidation && productIdValidation){
        let Data = req.body
        let savedData = await orderModel.create(Data)
        let updatedOrder = null
        // console.log(req['isFreeAppUser'])
        if(req['isFreeAppUser'] == 'true'){
            updatedOrder =  await orderModel.findOneAndUpdate({},{$set: {amount: 0, isFreeAppUser: true}})
            res.send(updatedOrder)
        }
        else{
            let productPrice = (await productModel.findById({_id:productId},{price:1})).price       
            let userBalance = (await userModel.findById({_id:userId},{balance:1})).balance         
            
            if (productPrice > userBalance){
                res.send("Insufficient Balance")
            }
            else{
                let deductedValue = userBalance-productPrice
                let updatedUser = await userModel.findOneAndUpdate({_id:userId},{$set: {balance: deductedValue}})
                updatedOrder = await orderModel.findOneAndUpdate({},{$set: {amount: productPrice, isFreeAppUser: false}},{new: true})
                res.send(updatedOrder)
            }
        }

    }
    else{
        res.send("Invalid User or Invalid Product.")
    }
    // let Data = req.body
    // let savedData = await orderModel.create(Data)
    // res.send(savedData)

}

module.exports.orderDetails = orderDetails

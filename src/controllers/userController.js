const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createUser = async function (req, res) {

  try {
    let Data = req.body
    if (Object.keys(Data).length) {
      // let isUserExist = await userModel.exists(Data)

      let savedData = await userModel.create(Data)
      return res.status(201).send({ status: true, Data: savedData })

    }
    else {
      return res.status(400).send({ status: false, msg: "ERROR!!! fill all fields." })
    }
  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }


}

const userLogin = async function (req, res) {

  try {
    let userEmailId = req.body.emailId
    let userPassword = req.body.password

    let user = await userModel.findOne({ emailId: userEmailId, password: userPassword })
    
    //If user leaves the block empty then also it didnot find the values in userEmailId and userPassword so findOne() will give the null value to the user variable and then the condition if(!user) will become true and shows that something went wrong.
    if (!user) {
      return res.status(400).send({ status: false, msg: "something went wrong try again..." })
    }

    let token = jwt.sign({
      userId: user._id.toString(),
      name: user.firstName
    }, "jamesBond")

    return res.status(200).send({ status: true, token: token })
  }
  catch (err) {                            // catch block will only run when there is some error in server side
    res.status(500).send({ msg: err.message })
  }
}



const userDetails = async function (req, res) {

  try {

    let userId = req.params.userId
    let userDetails = await userModel.findById(userId)
    return res.status(200).send({ status: true, details: userDetails })

  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

const updateDetails = async function (req, res) {

  let userId = req.params.userId
  let updated = req.body

  let updatedValue = await userModel.findOneAndUpdate({ _id: userId }, { $set: updated }, { new: true })
  res.status(200).send({ status: true, updatedDetails: updatedValue })

}

const deleteUser = async function (req, res) {
  let userId = req.params.userId
  let deletedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true })
  res.send({ status: true, deletedAccount: deletedUser })
}

module.exports.createUser = createUser
module.exports.userLogin = userLogin
module.exports.userDetails = userDetails
module.exports.updateDetails = updateDetails
module.exports.deleteUser = deleteUser



const authorModel = require('../models/authorModel')

const createAuthor = async function (req, res) {

    try {
        let { fname, lname, title, email, password } = req.body

        if (!(fname && lname && title && email && password)) {
            return res.status(400).send({ status: false, data: "All fields are required" })
        }
        let validEmail = await authorModel.findOne({ email: email })

        if (validEmail) {
            return res.status(409).send({ status: false, data: "Email Already Exists" })
        }

        let dataAuthor = await authorModel.create({ fname, lname, title, email, password })
        console.log("done ")
        return res.status(201).send({ status: true, data: dataAuthor })
    } 
    catch (err) {
        return res.status(500).send({ status: false, err: err })
    }

}



module.exports.createAuthor = createAuthor
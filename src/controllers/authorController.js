const authorModel = require("../models/authorModel");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

///////////////////////////////////////////////////1Create//////////////////////////////////////////////////////////////////////////

const createAuthor = async function (req, res) {
  try {
    let { fname, lname, title, email, password } = req.body;

    if (!(fname && lname && title && email && password)) {
      return res
        .status(400)
        .send({ status: false, data: "All fields are required" });
    }

    let validEmailFormat = validator.validate(email);
    if (!validEmailFormat) {
      return res.status(400).send({ status: false, msg: "Invalid Email" });
    }

    let validEmail = await authorModel.findOne({ email: email });

    if (validEmail) {
      return res
        .status(409)
        .send({ status: false, data: "Email Already Exists" });
    }

    let dataAuthor = await authorModel.create({
      fname,
      lname,
      title,
      email,
      password,
    });
    console.log("done ");
    return res.status(201).send({ status: true, data: dataAuthor });
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};
///////////////////////////////////////////////////2authorCreate//////////////////////////////////////////////////////////////////////////

const loginAuthor = async function (req, res) {
  let { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .send({ status: false, msg: "Please fill all fields" });
  }

  let validEmailFormat = validator.validate(email);
  if (!validEmailFormat) {
    return res.status(400).send({ status: false, msg: "Invalid Email" });
  }

  let validAuthor = await authorModel.findOne({
    email: email,
    password: password,
  });

  if (!validAuthor) {
    return res
      .status(400)
      .send({ status: false, msg: "Please enter valid email and password" });
  }

  let token = jwt.sign(
    { authorId: validAuthor._id.toString() },
    "functionUpgroupnumber32"
  );

  return res.status(200).send({ status: true, msg: token });
};

module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;

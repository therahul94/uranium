const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const commonMW = require('../middlewares/commonMiddleware')

router.post("/users", userController.createUser)

router.post("/login", userController.userLogin)

router.get("/users/:userId", commonMW.mid1, userController.userDetails)

router.put("/users/:userId", commonMW.mid1, userController.updateDetails)

router.delete("/users/:userId", commonMW.mid1, userController.deleteUser)

module.exports = router;
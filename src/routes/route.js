const express = require('express');
const router = express.Router();
const bookObj = require('../controllers/userController')

router.post('/create', bookObj.addBook)

router.get('/getBookDetails', bookObj.allBooks)
module.exports = router;
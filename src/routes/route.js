const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const publisherController = require('../controllers/publisherController');
const bookController = require('../controllers/bookController')

// >>>>>  Write a POST api that creates an author from the details in request body
router.post ("/createAuthor", authorController.createAuthor)
router.post ("/createPublisher", publisherController.createPublisher)
router.post ("/createBook", bookController.createBook)
router.get ("/fetchBookDetails", bookController.getBookDetails)
router.put ("/books", bookController.updatedValues)

module.exports = router;
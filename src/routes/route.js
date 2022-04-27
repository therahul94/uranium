const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogsController = require('../controllers/blogsController')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// 1)
router.post("/createAuthor", authorController.createAuthor)

//2)
router.post("/blogs", blogsController.createBlogs)

//3)
router.get("/blogs", blogsController.getBlogs)

//4)
router.put("/blogs/:blogId", blogsController.updateBlogs)


//5)
router.delete("/blogs/:blogId", blogsController.deletedBlogs)

// 6)
router.delete("/blogs", blogsController.deletedUsingQueryParams)


// router.

module.exports = router;
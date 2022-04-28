const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogsController = require('../controllers/blogsController')
const authenticateMW = require('../middlewares/authenticateMid')
const authorizeMW = require('../middlewares/authorizeMid')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// 1)
router.post("/createAuthor", authorController.createAuthor)

//2)
router.post("/blogs", authenticateMW.mid1, blogsController.createBlogs)

//3)
router.get("/blogs",authenticateMW.mid1, blogsController.getBlogs)

//4)
router.put("/blogs/:blogId",authorizeMW.authrAuth, blogsController.updateBlogs)


//5)
router.delete("/blogs/:blogId",authorizeMW.authrAuth, blogsController.deletedBlogs)

// 6)
router.delete("/blogs",authorizeMW.authrAuth, blogsController.deletedUsingQueryParams)

//7)
router.post("/login", authorController.loginAuthor)

module.exports = router;
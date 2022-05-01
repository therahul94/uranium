const blogsModel = require("../models/blogsModel");
const authorModel = require("../models/authorModel");


///////////////////////////////////////////////////3Createblog//////////////////////////////////////////////////////////////////////////

const createBlogs = async function (req, res) {
  try {
    let { title, body, authorId, category, subcategory } = req.body;

    if (!(title && body && authorId && category && subcategory)) {
      return res
        .status(400)
        .send({ status: false, data: "All fields are required" });
    }

    let validAuthorId = await authorModel.findById(authorId);
    console.log(validAuthorId);

    if (!validAuthorId) {
      return res.status(409).send({ status: false, data: "Author not exist." });
    }
    
    let dataBlogs = await blogsModel.create(req.body);
    console.log("done");

    if (req.body.isPublished === true) {
      dataBlogs.publishedAt = new Date();
      dataBlogs.save();
    }

    return res.status(201).send({ status: true, data: dataBlogs });
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

///////////////////////////////////////////////////4/blogs//////////////////////////////////////////////////////////////////////////

const getBlogs = async function (req, res) {
  try {
    let findData = req.query;

    let allBlogs = await blogsModel.find({
      $and: [findData, { isPublished: true }, { isDeleted: false }],
    });

    if (!allBlogs.length) {
      return res
        .status(404)
        .send({ status: false, msg: "No documents are found" });
    }

    return res.status(200).send({ status: true, data: allBlogs });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

///////////////////////////////////////////////////5/blogs/:blogId//////////////////////////////////////////////////////////////////////////

let updateBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let isBlogIdExist = await blogsModel.findById(blogId);

    if (!isBlogIdExist) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog does not Exist." });
    }

    if (isBlogIdExist.isDeleted === true) {
      return res
        .status(404)
        .send({ status: false, msg: "requesting for deleted account" });
    }

    let data = req.body;

    let updatedBlog = await blogsModel.findByIdAndUpdate(
      { _id: blogId },
      { $set: data, publishedAt: new Date() },
      { new: true }
    );

    res.status(200).send({ status: true, msg: updatedBlog });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


///////////////////////////////////////////////////6/blogs/:blogId////////////////////////////////////////////////////////////////////////



let deletedBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let isBlogIdPresent = await blogsModel.findById(blogId);

    if (!isBlogIdPresent) {
      return res.status(404).send({ status: false, msg: "BlogId not found" });
    }

    if (isBlogIdPresent.isDeleted === true) {
      return res
        .status(404)
        .send({ status: false, msg: "You are requesting for deleted Account" });
    }

    let deletedAccount = await blogsModel.findByIdAndUpdate(
      { _id: blogId },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    return res.status(202).send({ status: true, msg: "blog is deleted" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


///////////////////////////////////////////////////7/blogs////////////////////////////////////////////////////////////////////////

let deletedUsingQueryParams = async function (req, res) {
  try {
    let deleteData = req.query;
    console.log(deleteData);

    if (Object.keys(deleteData).length === 0) {
      return res.send({ status: false, msg: "ERROR" });
    }

    let authId = req.headers.authorId;
    console.log(authId);

    let delData = await blogsModel.updateMany(
      { $and: [deleteData, { isDeleted: false }, { authorId: authId }] },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (delData.matchedCount == 0) {
      return res.status(404).send({
        status: false,
        msg: "you are not authorised for this particular task",
      });
    }

    return res.status(200).send({ status: true, msg: "blog is deleted" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.createBlogs = createBlogs;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deletedBlogs = deletedBlogs;
module.exports.deletedUsingQueryParams = deletedUsingQueryParams;

const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true,
        ref: ObjectId
    },
    tags: {
        type: [String]
    },
    category: {
        type: [string],
        required: true
    },
    subcategory: {
        type: [string],
        required: true
    },
    deletedAt: {
        type: String,
    },
    isDeleted: {
        type: boolean,
        default: false
    },
    publishedAt: {
        type: String,
    },
    isPublished: {
        type: boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Project32Blogs', blogsSchema)
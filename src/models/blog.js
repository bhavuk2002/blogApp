const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Array
    },
    img: {
        type: Buffer
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Author'
    }

}, {
    timestamps: true
})

blogSchema.methods.toJSON = function() {
    const blog = this
    const blogObject = blog.toObject()

    delete blogObject.img

    return blogObject
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
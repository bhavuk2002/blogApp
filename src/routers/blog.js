const express = require('express')
const router = new express.Router()
const Blog = require('../models/blog.js')
const Author = require('../models/author.js')
const multer = require('multer')
const sharp = require('sharp')
const upload = multer({
    limits: 1000000,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a image'))
        }

        cb(undefined, true)

    }
})

router.post('/blog',  upload.single('img'), async (req, res) => {
    
    const blog = new Blog(req.body)
    
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        blog.img = buffer
        await blog.save()
        res.status(201).send(blog)

    } catch (error) {
    
        res.status(400).send(error)
    }

})

router.get('/blog/:id', async (req, res) => {
    
    
    
    try {
        const blog = await Blog.findById(req.params.id)    
        const author = await Author.findById(blog.owner)
        res.status(201).send(
            {blog, author}
        )

    } catch (error) {
    
        res.status(400).send(error)
    }

})

module.exports = router
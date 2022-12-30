const express = require('express')
const Author = require('../models/author.js')
const router = new express.Router()

router.post('/author', async (req, res) => {
    
    const author = new Author(req.body)
    
    try {
        await author.save()
        res.status(201).send(author)

    } catch (error) {
    
        res.status(400).send(error)
    }

})

module.exports = router
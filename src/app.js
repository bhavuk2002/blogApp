const express = require('express')
require('./db/mongoose.js')
const blogRoute = require('./routers/blog.js')
const authorRoute = require('./routers/author.js')

const app = express()

app.use(express.json()) // to access json from req handlers 
app.use(blogRoute)
app.use(authorRoute)

module.exports = app
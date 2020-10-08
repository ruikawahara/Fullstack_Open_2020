const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')

// view entire DB conent
bloglistRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => res.json(blogs))
})

module.exports = bloglistRouter
const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')

// view entire DB conent
bloglistRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => res.json(blogs))
})

// view individual DB content
bloglistRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog)
                res.json(blog)
            else
                res.status(404).end()
        })
        .catch(error => next(error))
})

module.exports = bloglistRouter
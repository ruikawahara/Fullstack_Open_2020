const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')

// view entire DB conent
bloglistRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

// view individual DB content
bloglistRouter.get('/:id', async (req, res, next) => {
    try {
        const singleBlog = await Blog.findById(req.params.id)
        if (singleBlog)
            res.json(singleBlog)
        else
            res.status(404).end()
    }
    catch (e) {
        next(e)
    }
    /*
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog)
                res.json(blog)
            else
                res.status(404).end()
        })
        .catch(error => next(error))
    */
})

// add DB entry
bloglistRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => res.status(201).json(result))
        .catch(error => next(error))
})

// delete DB entry
bloglistRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

// update DB entry.
// No restriction for PUT req as of now, may added it later
bloglistRouter.put('/:id', (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updateBlog => res.json(updateBlog))
        .catch(error => next(error))
})

module.exports = bloglistRouter
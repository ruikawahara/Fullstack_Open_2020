const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')

// view entire DB conent
bloglistRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

// view individual DB content
bloglistRouter.get('/:id', async (req, res) => {
    const singleBlog = await Blog.findById(req.params.id)
    if (singleBlog)
        res.json(singleBlog)
    else
        res.status(404).end()
})

// add DB entry
bloglistRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

// delete DB entry
bloglistRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

// update "likes" field of DB entry.
// may need to add validator for put request here in future
bloglistRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const blog = { likes: body.likes }
    // const blog = {
    //     title: body.title,
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes,
    // }

    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updateBlog => res.json(updateBlog))
        .catch(error => next(error))
})

module.exports = bloglistRouter
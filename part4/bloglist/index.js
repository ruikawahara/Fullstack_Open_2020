require('dotenv').config()
// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/bloglist')

app.use(cors())
app.use(express.json())

// default page
app.get('/', (req, res) => res.send('<h1>No front-end until part5</h1>'))

// view entire DB conent
app.get('/api/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => res.json(blogs))
})

// view individual DB content
app.get('/api/blogs/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog)
                res.json(blog)
            else
                res.status(404).end()
        })
        .catch(error => next(error))
})

// add DB entry
app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => res.status(201).json(result))
})

// delete DB entry
app.delete('/api/blogs/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

// update DB entry
app.put('/api/blogs/:id', (req, res, next) => {
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

// endpoint and error handlers
const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError')
        return res.status(400).send({ error: 'malformatted id' })
    else if (error.name === 'ValidationError')
        return res.status(400).json({ error: error.message })

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
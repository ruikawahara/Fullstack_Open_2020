const config = require('./utils/config')
// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/bloglist')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const bloglistRouter = require('./controllers/bloglist')


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// default page
app.get('/', (req, res) => res.send('<h1>No front-end until part5</h1>'))


/*
// view entire DB conent
app.get('/api/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => res.json(blogs))
})
*/

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

app.use('/api/blogs', bloglistRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
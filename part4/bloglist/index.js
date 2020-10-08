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
app.get('/api/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog)
                res.json(blog)
            else
                res.status(404).end()
        })
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})

// add DB entry
app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => res.status(201).json(result))
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
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

// view database conent
app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

// add DB entry
app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
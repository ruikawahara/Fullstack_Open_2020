/*
const config = require('./utils/config')
// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
// const Blog = require('./models/bloglist')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const bloglistRouter = require('./controllers/bloglist')


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// default page... replace with build when adding front end
app.get('/', (req, res) => res.send('<h1>No front-end until part5</h1>'))

app.use('/api/blogs', bloglistRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
*/

const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
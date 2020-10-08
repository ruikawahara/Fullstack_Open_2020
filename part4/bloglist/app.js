const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const bloglistRouter = require('./controllers/bloglist')
const mongoose = require('mongoose')

logger.info('connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('connected to MongoDB'))
    .catch((error) => console.error('error connecting to MongoDB: ', error.message))

app.use(cors())

// default page... replace with build when adding front end
app.get('/', (req, res) => res.send('<h1>No front-end until part5</h1>'))

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', bloglistRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
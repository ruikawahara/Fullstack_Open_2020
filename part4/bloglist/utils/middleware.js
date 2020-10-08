// const { model } = require('../models/bloglist')
const logger = require('./logger')

// outputs your request info
const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('----------------')
    next()
}

// endpoint and error handlers
const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError')
        return res.status(400).send({ error: 'malformatted id' })
    else if (error.name === 'ValidationError')
        return res.status(400).json({ error: error.message })

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
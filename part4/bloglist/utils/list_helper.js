const logger = require('./logger')

// practice testing
const dummy = (blogs) => {
    logger.info(blogs)
    return 1
}

module.exports = {
    dummy
}
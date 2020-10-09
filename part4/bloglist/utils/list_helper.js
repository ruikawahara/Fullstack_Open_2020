const logger = require('./logger')

// practice testing
const dummy = (blogs) => {
    logger.info(blogs)
    return 1
}

// get sum of total likes from blog
const totalLikes = (blogs) => {
    // 0 or 1 blog entry
    if (blogs.length < 2) {
        return blogs.length === 0
            ? blogs.length
            : blogs[0].likes
    }

    // if it has multiple blogs, return total likes
    return blogs
        .map(blog => blog.likes)
        .reduce((acc, cur) => acc + cur)
}

module.exports = {
    dummy,
    totalLikes
}
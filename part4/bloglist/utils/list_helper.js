// const logger = require('./logger')

// practice testing
const dummy = (blogs) => {
    // logger.info(blogs)
    blogs // place holder for practice
    return 1
}

// return sum of likes
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

// return blog with most likes
const favoriteBlog = (blogs) => {

    if (blogs.length === 0)
        return {}
    else if (blogs.length === 1) {
        return {
            'title': blogs[0].title,
            'author': blogs[0].author,
            'likes': blogs[0].likes
        }
    }
    else {
        const bestBlog = blogs.reduce((prev, current) => {
            return current.likes > prev.likes
                ? current
                : prev
        })

        return {
            'title': bestBlog.title,
            'author': bestBlog.author,
            'likes': bestBlog.likes
        }
    }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
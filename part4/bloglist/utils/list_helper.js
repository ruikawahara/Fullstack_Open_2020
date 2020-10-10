const _ = require('lodash')

// practice testing
const dummy = (blogs) => {
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

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return {}
    else {
        const authors = _.countBy(blogs, 'author')
        console.log(authors)
        return {}
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
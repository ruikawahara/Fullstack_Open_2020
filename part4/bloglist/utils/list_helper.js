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
    const mostWritten = _.maxBy(blogs, 'author')

    return (_.isUndefined(mostWritten))
        ? {}
        : {
            author: mostWritten.author,
            blogs: _.countBy(blogs, 'author')[mostWritten.author]
        }
}

const mostLikes = (blogs) => {

    const formatBlog = _.map(blogs, item => _.pick(item, ['author', 'likes']))
    const result = _(formatBlog)
        .groupBy('author')
        .map((val, key) => ({ author: key, likes: _.sumBy(val, 'likes') }))
        .value()

    const best = _.maxBy(result, 'likes')

    return (_.isUndefined(best))
        ? {}
        : best

    // const authors = _.groupBy(blogs, 'author')

    // if (!_.isEmpty(authors)) {

    //     // const result = _
    //     //     .map(authors, author => _.sumBy(author, blog => blog.likes))

    //     // console.log(result)
    // }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
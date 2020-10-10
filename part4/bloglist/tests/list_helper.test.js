const listHelper = require('../utils/list_helper')
const listWithOneBlog = require('./blog_content').listWithOneBlog
const blogs = require('./blog_content').blogs

// dummy test
test('dummy returns one', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
})


describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    // 7 + 5 + 12 + 10 + 0 + 2 = 36
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of empty list is empty object', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    const oneBlogMatch = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
    }
    test('has same info when it has only one blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(oneBlogMatch)
    })

    /*
    const bestBlogMatch = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
    }
    test('of bigger list gives blog info with most likes', () => {
        console.log(bestBlogMatch)
    })
    */
})
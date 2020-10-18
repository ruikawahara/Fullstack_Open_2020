// Beginning of exercise 4.8-4.12
const mongooose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper_blog')
const Blog = require('../models/bloglist')
const { initialBlogs } = require('./test_helper_blog')
const { reduce } = require('lodash')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        const blogObj = new Blog(blog)
        await blogObj.save()
    }
})

// ex 4.8
describe('GET Request - ALL', () => {
    test('makes proper GET req and returns in JSON format.', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns correct number of blogs', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })
})

// ex 4.9
describe('GET Request - SINGLE', () => {
    test('return single existing blog', async () => {
        const blogStart = await helper.blogsInDB()
        const firstBlog = blogStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${firstBlog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body.id).toBeDefined()
    })
})

// ex 4.10
describe('POST request - success', () => {

    test('valid entry can be added', async () => {
        const newBlog = {
            title: 'The Paxos Algorithm or How to Win a Turing Award',
            author: 'Leslie Lamport',
            url: 'http://lamport.azurewebsites.net/tla/paxos-algorithm.html?back-link=more-stuff.html#paxos?unhideBut@EQhide-paxos@AMPunhideDiv@EQpaxos',
            likes: 100
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogObject = await helper.blogsInDB()
        expect(blogObject).toHaveLength(initialBlogs.length + 1)

        const titles = blogObject.map(blog => blog.title)
        expect(titles).toContain('The Paxos Algorithm or How to Win a Turing Award')
    })
})

describe('POST request - missing entry', () => {
    let newBlog
    beforeEach(() => {
        newBlog = {
            title: 'The Paxos Algorithm or How to Win a Turing Award',
            author: 'Leslie Lamport',
            url: 'http://lamport.azurewebsites.net/tla/paxos-algorithm.html?back-link=more-stuff.html#paxos?unhideBut@EQhide-paxos@AMPunhideDiv@EQpaxos',
            likes: 100
        }
    })

    // ex 10.11
    test('sets "likes" field to 0 when missing', async () => {
        delete newBlog.likes

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogObject = await helper.blogsInDB()
        expect(blogObject).toHaveLength(initialBlogs.length + 1)

        // last index should have blog that was added
        const getNewestBlog = blogObject.find(
            blog => blog.id === blogObject[initialBlogs.length].id
        )

        expect(getNewestBlog.likes).toBe(0)
    })

    // ex 10.12
    test('returns 400 error when "title" is missing', async () => {
        delete newBlog.title

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        // double check - # of blogs should not have changed
        const blogCount = await helper.blogsInDB()
        expect(blogCount).toHaveLength(initialBlogs.length)
    })

    test('returns 400 error when "url" is missing', async () => {
        delete newBlog.url

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        // double check - # of blogs should not have changed
        const blogCount = await helper.blogsInDB()
        expect(blogCount).toHaveLength(initialBlogs.length)
    })
})

// ex 4.13
describe.only('DELETE request - remove blog(s)', () => {
    test('succeed with status code 204 if ID is valid', async () => {
        const blogAtStart = await helper.blogsInDB()

        // remove first blog
        await api
            .delete(`/api/blogs/${blogAtStart[0].id}`)
            .expect(204)

        // check if num of blogs is reduced by 1
        const blogAtEnd = await helper.blogsInDB()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        // check if title of deleted item doesn't exist
        const reducedBlogs = blogAtEnd.map(blog => blog.url)
        expect(reducedBlogs).not.toContain(blogAtStart[0].title)
    })

    test('remove all blogs and succeed with status code 204', async () => {
        const blogAtStart = await helper.blogsInDB()

        for (const blog of blogAtStart) {
            await api
                .delete(`/api/blogs/${blog.id}`)
                .expect(204)
        }

        const blogAtEnd = await helper.blogsInDB()
        expect(blogAtEnd).toHaveLength(0)
    })

    test.only('deletion of non-exsiting blog have no effect', async () => {
        const nonExistingBlogID = await helper.nonExistingID()

        await api
            .delete(`/api/blogs/${nonExistingBlogID}`)
            .expect(204)

        const allBlogs = await helper.blogsInDB()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status code 400 if id is invalid', async () => {
    })

})

afterAll(() => {
    mongooose.connection.close()
})
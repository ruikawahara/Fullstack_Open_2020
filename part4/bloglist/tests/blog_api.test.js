// Beginning of exercise 4.8-4.12
const mongooose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper_blog')
const Blog = require('../models/bloglist')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        const blogObj = new Blog(blog)
        await blogObj.save()
    }
})

describe.only('GET Request - ALL', () => {
    test('blogs returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })

    test('have specific info within returned blogs', async () => {
        const res = await api.get('/api/blogs')
        const title = res.body.map(blog => blog.title)

        expect(title).toContain(
            'Go To Statement Considered Harmful'
        )
    })
})

afterAll(() => {
    mongooose.connection.close()
})
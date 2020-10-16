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

describe.only('GET Request - SINGLE', () => {
    test('return single existing blog', async () => {
        const blogStart = await helper.blogsInDB()
        const firstBlog = blogStart[0]

        // const resultBlog = await api
        await api
            .get(`/api/blogs/${firstBlog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongooose.connection.close()
})
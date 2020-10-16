// Beginning of exercise 4.8-4.12
const mongooose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper_blog')
const Blog = require('../models/bloglist')
const { initialBlogs } = require('./test_helper_blog')

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

describe.only('POST request', () => {
    // ex 4.10
    test.only('valid entry can be added', async () => {
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

afterAll(() => {
    mongooose.connection.close()
})
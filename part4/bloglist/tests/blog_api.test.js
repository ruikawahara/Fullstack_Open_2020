// Beginning of exercise 4.8-4.12
const mongooose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test.only('GET(all) - all blogs are returned', async () => {
    const getResult = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongooose.connection.close()
})
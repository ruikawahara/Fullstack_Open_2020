const mongoose = require('mongoose') // may not need this
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper_blog')
const bcrypt = require('bcrypt')
const User = require('../models/users')

describe('Where there is at least one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('test', 10)
        const user = new User({ username: 'test', passwordHash })

        await user.save()
    })

    test('creation succeeds with new user', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'new user',
            name: 'new test guy',
            password: 'password123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // check one person is added to user DB
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

        // check 'new user' is added to user DB
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with right status code and msg if username is taken', async () => {
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username: 'test',
            name: 'failing test',
            password: 'password123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test.only('GET request to get (and display) all users', async () => {
        await api
            // await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})
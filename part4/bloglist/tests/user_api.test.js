const mongoose = require('mongoose')
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

    test('GET request to get (and display) all users', async () => {
        await api
            // await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    // afterAll(() => {
    //     mongoose.connection.close()
    // })
})

describe.only('Where invalid users will not be added to the database', () => {
    // initial database with 1 valid entry
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('validPassword123', 10)
        const user = new User({ username: 'test', passwordHash })

        await user.save()
    })

    test.only('User without username will fail creation process with correct error message', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            name: 'Saitama',
            password: 'OneManPunch'
        }

        // test right status code
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        // error message
        expect(result.body.error).toContain('`username` is required')

        // test that nothing was added to db
        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })

    test('Creation will fail if username has less than 3 characters', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'S',
            name: 'Saitama',
            password: 'OneManPunch123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length)

        // check if newUser's username is excluded
        const allUsernames = userAtEnd.map(user => user.username)
        expect(allUsernames).not.toContain('S')
    })

    test('Creation will fail if username is taken', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'test',
            name: 'Different Test Guy',
            password: 'DifferentPassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })

    test('User without password(hash) will fail creation process with appropriate error message', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'DCyborg',
            name: 'Genos'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(403)

        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length)

        const allUsernames = userAtEnd.map(user => user.username)
        expect(allUsernames).not.toContain('DCyborg')
    })

    test('Creation will fail if password has less than 3 characters', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'DCyborg',
            name: 'Genos',
            password: 'ps'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length)

        const allUsernames = userAtEnd.map(user => user.username)
        expect(allUsernames).not.toContain('DCyborg')
    })

    test('Passing example', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'DCyborg',
            name: 'Genos',
            password: 'psa'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length + 1)

        const allUsernames = userAtEnd.map(user => user.username)
        expect(allUsernames).toContain('DCyborg')
    })

    // close all db connection when done
    afterAll(() => {
        mongoose.connection.close()
    })
})
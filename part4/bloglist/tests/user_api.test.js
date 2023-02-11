const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(helper.userSetup)

describe('User creation', () => {
  test('Succeeds if the username is available', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: 'bingbong',
      name: 'dingdong',
      password: 'bimbam',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)

    const usernames = usersAfter.map((user) => user.username)
    return expect(usernames).toContain(newUser.username)
  })

  test('Fails if the username is taken', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'dingdong',
      password: 'bimbam',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('Fails if username is shorter than 3 characters', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: '12',
      name: 'dingdong',
      password: 'bimbam',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('Fails if password is shorter than 3 characters', async () => {
    const usersBefore = await helper.usersInDb()
    const newUser = {
      username: 'bingbong',
      name: 'dingdong',
      password: '12',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })
})

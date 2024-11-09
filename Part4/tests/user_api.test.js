const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require ('node:assert')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const initialUsers = helper.initialUsers
let testUseToken = { token:'' }

beforeEach(async () => {
  await User.deleteMany({})
  console.log('cleared users')

  for(let user of initialUsers){
    let userObj = new User(user)
    await userObj.save()
  }

  testUseToken.token = await helper.generateToke()
})

describe('initialize user api test', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three users', async () => {
    const response = await api.get('/api/users')
      .set('Authorization', `Bearer ${testUseToken.token}`)

    assert.strictEqual(response.body.length, initialUsers.length)
  })
})

describe('Invlid user is not added', () => {
  test('users name too short', async () => {
    const addUser = {
      username:'us',
      name: 'test Superuser',
      password: 'testsalainen',
    }

    const postResult =  await api
      .post('/api/users')
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .send(addUser)
      .expect(400)
    assert.strictEqual(postResult.body.error,'Username at least 3 letters')
  })

  test('Password name too short', async () => {
    const addUser = {
      username:'user',
      name: 'test Superuser',
      password: 'te',
    }

    const postResult =  await api
      .post('/api/users')
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .send(addUser)
      .expect(400)
    assert.strictEqual(postResult.body.error,'Password at least 3 letters')
  })

  test('Duplicate username not allowed', async () => {
    const addUser = {
      username:'testuser',
      name: 'test Superuser',
      password: 'test',
    }

    const postResult =  await api
      .post('/api/users')
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .send(addUser)
      .expect(400)
    assert.strictEqual(postResult.body.error,'Username must be unique')
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})

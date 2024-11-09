const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require ('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
const initialBlogs = helper.initialBlogs

let testUseToken = { token:'' }

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for(let blog of initialBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})
  console.log('user cleared')

  for(let user of helper.initialUsers){
    let userObject = new User(user)
    await userObject.save()
  }
  testUseToken.token = await helper.generateToke()
})

describe('initialize, some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${testUseToken.token}`)

    assert.strictEqual(response.body.length, 2)
  })

  test('has id property, not _id', async () => {
    const response = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${testUseToken.token}`)

    assert(Object.prototype.hasOwnProperty.call(response.body[0],'id'))
    assert.ok(!Object.prototype.hasOwnProperty.call(response.body[0],'_id'))
  })
})

describe('add some blogs', () => {
  test('a new blog is added', async () => {

    const beforeresponse = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${testUseToken.token}`)
    const testTitle = 'posted from test'
    const testAuthor = 'post api test'
    const newBlog = {
      title: testTitle,
      author: testAuthor,
      user: '',
      url: 'http://:3003',
      likes: 2,
    }

    const postResult =  await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    assert.strictEqual(postResult.body.title, testTitle)
    assert.strictEqual(postResult.body.author, testAuthor)

    const response = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${testUseToken.token}`)

    assert.strictEqual(response.body.length, beforeresponse.body.length + 1)

  })

  test('post without likes value', async () => {
    const newBlog = {
      title: 'test wihout likes',
      author: 'Author wihout likes',
      url: 'http://:3003',
    }

    const postResult =  await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    assert.strictEqual(postResult.body.likes, 0)
  })

  test('post without title', async () => {
    const newBlog = {
      author: 'Author wihout like',
      url: 'http://:3003',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .expect(400)
      .expect('Content-Type',/application\/json/)
  })

  test('post without URL', async () => {
    const newBlog = {
      title: 'test wihout URL',
      author: 'Author wihout URL',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .send(newBlog)
      .expect(400)
  })

  test('post without Authorization', async () => {
    const newBlog = {
      title: 'test wihout URL',
      author: 'Author wihout URL',
      url: 'http://:3003',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  test ('Expect 401 and only Author can delete message ', async () => {
    const blogsAtStart = await helper.blogsInDB()

    const blogToDelete = blogsAtStart[blogsAtStart.length-1]

    const delResult = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .expect(401)

    assert.strictEqual(delResult.body.error,'Only author can delete.')
    const blogsAtEnd = await helper.blogsInDB()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('Update a blog by adding five likes', () => {
  test ('succeeds with higher likes number', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
    const likesAdded = 5

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      URL: blogToUpdate.URL,
      likes: blogToUpdate.likes + likesAdded
    }

    const putResult =  await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${testUseToken.token}`)
      .send(updatedBlog)
      .expect(200)

    assert.strictEqual(putResult.body.likes, blogToUpdate.likes + likesAdded)
  })
})

after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})
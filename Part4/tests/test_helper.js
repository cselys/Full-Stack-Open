const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    user: new mongoose.Types.ObjectId(),
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    user: new mongoose.Types.ObjectId(),
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
]


const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return  blogs.map( blog => blog.toJSON())
}

const initialUsers = [
  {
    username:'testroot',
    name: 'test Superuser',
    password: 'testsalainen',
  },
  {
    username:'testAdmin',
    name: 'test Admin',
    password: 'testsalainen',
  },
  {
    username:'testuser',
    name: 'test User',
    password: 'testsalainen',
  },
]

const usersInDB = async () => {
  const users = await User.find({})
  return  users.map( user => user.toJSON())
}

const generateToke =  async (userNameObj) => {
  const userObj = (!userNameObj)? { username:initialUsers[0].username } : userNameObj
  const testUser = await User.findOne(userObj)
  if(testUser){
    const userForToken = {
      username: testUser.username,
      id: testUser._id,
    }
    return  jwt.sign(userForToken, process.env.SECRET)
  }
  return null
}

module.exports = {
  initialBlogs, blogsInDB , initialUsers, usersInDB, generateToke
}
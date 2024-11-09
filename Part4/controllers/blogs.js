const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const body = request.body

  if(body.title === undefined || body.title === '')
    response.status(400).json({ message:'title is missing.' })
  else  if(body.url === undefined || body.url === '')
    response.status(400).json({ message:'url is missing.' })
  else {
    const user = await User.findById(request.user)

    const blog = new Blog( {
      title: body.title,
      author: body.author,
      user: user.id,
      url: body.url,
      likes: body.likes || 0
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  const blogToDelete = await Blog.findById(request.params.id)
  if( request.user && blogToDelete && !(blogToDelete.user.toString() === request.user.toString())){
    return response.status(401).json({ error: 'Only author can delete.' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request, response) => {
  const users = await User.find({}).populate('blogs', { url:1, title:1, author:1, id:1 })
  response.json(users)
})

usersRouter.post('/', async(request, response) => {
  const { username, name, password } = request.body

  if (!username || username.length <3 ) {
    return response.status(400).json({
      error: 'Username at least 3 letters'
    })
  }
  else if (!password || password.length <3 ) {
    return response.status(400).json({
      error: 'Password at least 3 letters'
    })
  }

  const userT = await User.findOne({ username })
  if (userT) {
    return response.status(400).json({
      error: 'Username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
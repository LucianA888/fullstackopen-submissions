const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (password.length < 3)
    return response.status(400).json({ error: "password needs to be at least 3 characters long"})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  // populate means it will link the actual blog and not just its id
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
  response.json(users)
})

module.exports = userRouter

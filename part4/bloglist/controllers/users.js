const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const helper = require('../tests/apiTest_helper')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  // Regex checker for password strength before the password is hashed
  const testPass = helper.strongPassword(body.password)

  if(!testPass) {
    response.status(400).json(
      'Password must contain at least 1 upper case, ' +
      '1 lower case, 1 numeric and 1 symbol character')
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    try {
      const savedUser = await user.save()
      response.json(savedUser)
    } catch(exception) {
      next(exception)
    }
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter
// https://expressjs.com/en/guide/routing.html
// https://expressjs.com/en/4x/api.html#router
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)

  // Code after each await expression can be thought of as existing
  // in a .then callback. In this way a promise chain is progressively
  // constructed with each reentrant step through the function.
  // The return value forms the final link in the chain.
})

blogsRouter.post('/', async (request, response, next) => {

  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Blog.findByIdAndDelete(id)
    // console.log('Deleted Blog:', result)
    response.status(204).end()
  } catch(exception) {
    // invalid ID 400 bad request
    // doesn't catch non-existent resource only invalid ID format
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id  = request.params.id
  const blog = request.body

  try {
    const result = await Blog
      .findByIdAndUpdate(id, blog, { new: true })
    response.json(result)
    // console.log('Updated Blog:', result)
  } catch(exception) {
    // invalid ID 400 bad request
    // doesn't catch non-existent resource only invalid ID format
    next(exception)
  }
})

// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,” capable only of
// performing middleware and routing functions.
// Every Express application has a built-in app router.

module.exports = blogsRouter
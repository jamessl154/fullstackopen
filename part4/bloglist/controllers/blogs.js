// https://expressjs.com/en/guide/routing.html
// https://expressjs.com/en/4x/api.html#router
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
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

  try {
    // the id of the resource to delete
    const id = request.params.id

    // finds the blog in the blogs collection, so we can access its user property
    // which tells us the id of who added that blog
    const blog = await Blog.findById(id)

    // the request must have a token attatched to its authorization header
    // that verifies the user is logged in and from this we can check
    // for a match with the id of the user sending the delete request
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // 403 Forbidden
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: 'You can only delete blogs that you have created' })
    }

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
// https://expressjs.com/en/guide/routing.html
// https://expressjs.com/en/4x/api.html#router
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
// const mongoose = require('mongoose')

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

// register middleware exclusive to the post + delete route
// that gives access to request.user which is the ID of the logged in user that sent the request
blogsRouter.post('/', middleware.userExtractor,  async (request, response, next) => {

  try {
    const body = request.body

    const user = await User.findById(request.user)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    // https://masteringjs.io/tutorials/mongoose/save
    // mongoose.set('debug', true)
    // console.log('user before concat', user)
    // user.blogs = user.blogs.concat(savedBlog._id)
    // console.log('user after concat', user)
    // await user.save()

    // Concatenate the blog id to the blogs array of the user in users
    await user.updateOne({ blogs: user.blogs.concat(savedBlog._id) })

    // populate the returned object
    await savedBlog.populate('user', { username: 1, name: 1 })

    response.json(savedBlog)

  } catch(exception) {
    // If there is no token in the header or
    // the token is invalid, it is handled by the
    // userExtractor middleware
    next(exception)
  }
})

// register middleware exclusive to the post + delete route
// that gives access to request.user which is the ID of the logged in user that sent the request
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  try {
    // the id of the blog resource to delete
    const id = request.params.id

    // finds the blog in the blogs collection, so we can access its user property
    // which tells us the id of who added that blog
    const blog = await Blog.findById(id)

    // request.user is from userExtractor middleware. the middleware parses the request header for
    // the token and decodes it for the id of the logged in user that sent this request (the user
    // must have logged in to have access to a token to send in their requests)

    // They must be the same to proceed, else 403 Forbidden
    if (blog.user.toString() !== request.user.toString()) {
      return response.status(403).json({ error: 'You can only delete blogs that you have created' })
    }

    await Blog.findByIdAndDelete(id)
    // console.log('Deleted Blog:', result)
    response.status(204).end()

  } catch(exception) {
    // invalid ID 400 bad request
    // or token is from a different user 401 unauthorized
    // doesn't catch non-existent resource
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id  = request.params.id
  const blog = request.body

  try {
    const result = await Blog
      .findByIdAndUpdate(id, blog, { new: true })
      .populate('user', { username: 1, name: 1 })
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
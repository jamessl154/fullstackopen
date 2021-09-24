// https://expressjs.com/en/guide/routing.html
// https://expressjs.com/en/4x/api.html#router
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const result = await Blog.findByIdAndDelete(id)
    console.log('Deleted Blog:', result)
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
    console.log('Updated Blog:', result)
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
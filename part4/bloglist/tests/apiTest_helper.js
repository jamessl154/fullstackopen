const Blog = require('../models/blog')
const User = require ('../models/user')

const initialBlogs = [
  {
    title: 'Joe Bloggs',
    author: 'Joe',
    url: 'joebloggs.io',
    likes: 1
  },
  {
    title: 'Bloggers',
    author: 'Jack',
    url: 'blogchamp.com',
    likes: 1
  },
]

const strongPassword = (password) => {
  // https://stackoverflow.com/a/7684859
  // Positive lookahead must contain at least 1 a-z, A-Z, 0-9, non-word char including _
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])([a-zA-Z0-9\W_]+)$/.test(password)
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'delete',
    author: 'this',
    url: 'soon',
    likes: 1234567
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  strongPassword
}
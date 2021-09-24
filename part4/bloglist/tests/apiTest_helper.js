const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Joe Bloggs',
    author: 'Joe',
    url: 'joebloggs.io',
    likes: 12345678
  },
  {
    title: 'Bloggers',
    author: 'Jack',
    url: 'blogchamp.com',
    likes: 12345668
  },
]

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
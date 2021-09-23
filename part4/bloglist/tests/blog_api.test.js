// api tests
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  // map initialBlogs to Mongoose objects
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  // map Mongoose objects to promises
  const promiseArray = blogObjects.map(blog => blog.save())
  // promiseArray transformed into single promise that is fulfilled
  // after all promises in the promiseArray are resolved
  await Promise.all(promiseArray)
})

test('Blogs are returned as json', async () => {
  // console.log('test starts', mongoose.connection.readyState)
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    // .then(console.log('Bug is here', mongoose.connection.readyState))
  // console.log('promise chain ends', mongoose.connection.readyState)
}, 100000)

test('All blogs are returned from a get request on all', async () => {
  const response = await helper.blogsInDb()

  expect(response).toHaveLength(helper.initialBlogs.length)
})

test('Returned blogs contains blog with title Joe Bloggs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'Joe Bloggs'
  )
})

test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Gill',
    url: 'wentupthehill.com',
    likes: 123456621
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('An invalid blog (no title) is not added', async () => {
  const newBlogs = {
    author: 'Gill',
    url: 'wentupthehill.com',
    likes: 123456621
  }

  await api
    .post('/api/blogs')
    .send(newBlogs)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

/*

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/notes/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.content)

  expect(contents).not.toContain(blogToDelete.content)
})

*/

// When using promise chains instead of async await I ran into this problem:
// "Jest did not exit one second after the test run has completed."
// added the jest.config.js file to the root of the directory but the problem
// persisted.
// added a beforeAll that ensures the db is connected before starting the tests:
// https://stackoverflow.com/a/64884634
// "Connection not established before calling mongoose.connection.close()"
// beforeAll If no connection to db, add event listener to
// mongoose.connection that on 'connected' event triggers a
// done to start the tests

// beforeAll((done) => {
//   if(!mongoose.connection.db){
//     mongoose.connection.on('connected', done)
//   } else {
//     done()
//   }
// })

// https://stackoverflow.com/a/19606067
// in afterAll() mongoose.connection.readyState returns:
// 1 (connected) before and 3 (disconnecting) after
// with and without the above beforeAll.

afterAll(() => {
  // console.log('Afterall called', mongoose.connection.readyState)
  mongoose.connection.close()
  // console.log('mongoose.connection.close()', mongoose.connection.readyState)
})

// Overall, it does make sense that if .close() is called before the
// database is opened. Once the database opens, it will remain
// open and asynchronous operations in the test can persist so that could be
// the issue

// After multiple console.logs I think the problem is related
// to the console.logs on line 23 and 28 that returns 2 (disconnected)
// without the beforeAll and returns 1 (connected) with the beforeAll.
// Furthermore, the position of the console.log 'connected to MongoDB'
// shifts from after the request is logged to before.
// At least we should be more certain when the
// database is opened and closed using this method
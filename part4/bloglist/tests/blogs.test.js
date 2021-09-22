const testFunctions = require('../utils/test_functions')
const testExamples = require('../utils/test_examples')

test('dummy returns one', () => {
  // https://developer.mozilla.org/en-US/docs/Glossary/Falsy
  // an array of any size including the empty array will return 1
  // emptyBlogList = []
  const result = testFunctions.dummy(testExamples.emptyBlogList)
  expect(result).toBe(1)
})

describe('Total likes of all blogs', () => {
  test('of empty list is zero', () => {
    expect(testFunctions.totalLikes(testExamples.emptyBlogList)).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    expect(testFunctions.totalLikes(testExamples.listWithOneBlog)).toBe(5)
  })
  test('For all blogs, total likes returns the sum of property likes', () => {
    expect(testFunctions.totalLikes(testExamples.blogs)).toBe(36)
  })
})

describe('The Favourite blog', () => {
  test('of empty list to be null', () => {
    expect(testFunctions.favBlog(testExamples.emptyBlogList))
      .toEqual(null)
  })
  test('of single blog is itself', () => {
    expect(testFunctions.favBlog(testExamples.listWithOneBlog))
      .toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
  })
  test('for many blogs returns the blog with most likes', () => {
    expect(testFunctions.favBlog(testExamples.blogs))
      .toEqual({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      })
  })
})

describe('Author with most blogs written', () => {
  test('when no blogs (no authors) return null', () => {
    expect(testFunctions.mostBlogs(testExamples.emptyBlogList))
      .toEqual(null)
  })
  test('of single blog is that author and blogs is 1', () => {
    expect(testFunctions.mostBlogs(testExamples.listWithOneBlog))
      .toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })
  test('when many blogs, returns author that wrote the most blogs and how many he wrote', () => {
    expect(testFunctions.mostBlogs(testExamples.blogs))
      .toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('Author with most likes on blogs written', () => {
  test('when no blogs (no authors) return null', () => {
    expect(testFunctions.mostLikes(testExamples.emptyBlogList))
      .toEqual(null)
  })
  test('of single blog is that author and likes', () => {
    expect(testFunctions.mostLikes(testExamples.listWithOneBlog))
      .toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })
  test('when many blogs, return the author that has the most likes and how many likes he has', () => {
    expect(testFunctions.mostLikes(testExamples.blogs))
      .toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
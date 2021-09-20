const testFunctions = require('../utils/test_functions')
const testExamples = require('../utils/test_examples')

test('dummy returns one', () => {
  // https://developer.mozilla.org/en-US/docs/Glossary/Falsy
  // an array of any size including the empty array will return 1
  // emptyBlogList = []

  const result = testFunctions.dummy(testExamples.emptyBlogList)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(testFunctions.totalLikes(testExamples.emptyBlogList)).toBe(0)
  })
  test('For all blogs, total likes returns the sum of property likes', () => {
    expect(testFunctions.totalLikes(testExamples.blogs)).toBe(36)
  })
  test('when list has only one blog, equals the likes of that', () => {
    expect(testFunctions.totalLikes(testExamples.listWithOneBlog)).toBe(5)
  })
})

describe('favourite blog', () => {
  test('of empty list to be null', () => {
    expect(testFunctions.favBlog(testExamples.emptyBlogList))
      .toEqual(null)
  })
  test('of single blog is itself', () => {
    expect(testFunctions.favBlog(testExamples.listWithOneBlog))
      .toEqual(testExamples.listWithOneBlog[0])
  })
  test('for many blogs returns the blog with most likes', () => {
    expect(testFunctions.favBlog(testExamples.blogs))
      .toEqual(testExamples.blogs[2])
  })
})

describe('The author with the most blogs', () => {
  test('for many blogs', () => {
    console.log(testFunctions.mostBlogs(testExamples.blogs))
    expect(testFunctions.mostBlogs(testExamples.blogs))
      .toEqual('Robert C. Martin')
  })
})
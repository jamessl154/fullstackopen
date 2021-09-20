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

describe('favoriteBlog')
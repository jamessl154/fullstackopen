// Function tests
// https://lodash.com/docs/4.17.15
const _ = require('lodash')

const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  let total = 0

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > 0) {
      total += blogs[i].likes
    }
  }

  return total
}

const favBlog = (blogs) => {
  // base case
  if (blogs.length === 0) return null

  let mostLikes = 0
  let favBlog = null

  for (let i=0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikes) {
      mostLikes = blogs[i].likes
      favBlog = blogs[i]
    }
  }

  // https://lodash.com/docs/4.17.15#omit
  // omit properties from an object
  return _.omit(favBlog, ['_id', 'url', '__v'])
}

// https://javascript.plainenglish.io/how-to-find-the-most-frequent-element-in-an-array-in-javascript-c85119dc78d2
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 }

  // reduces the blogs array to create a hashmap of authors and number of blogs written
  const hashmap = _.reduce(blogs, (result, blog) => {
    // if the 'blog.author' key exists in the hashtable, add 1 to it
    // if not, create and initialize at 0 + 1
    result[blog.author] = (result[blog.author] || 0 ) + 1
    return result
  },{})

  // https://lodash.com/docs/4.17.15#keys returns an array of the objects keys
  // reduces the hashmap which returns the key with the largest value
  const author = _.reduce(_.keys(hashmap), (a, b) => hashmap[a] > hashmap[b] ? a : b)
  // if value at hashmap[a] greater than at hashmap[b] then the
  // 'a' key is carried forward to evaluate against the next key
  // else 'b' carried forward
  // having iterated through the entire array of keys of the hashmap
  // the final return is the author with the largest value (blogs written)

  // We return object constructed in the desired format
  return {
    author: author,
    blogs: hashmap[author]
  }
}

// identical to the previous function
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const hashmap = _.reduce(blogs, (result, blog) => {
    // except we add the number of likes that blog has to the author in the hashmap
    // instead of counting the number of blogs by +1 increment
    result[blog.author] = ( result[blog.author] || 0 ) + blog.likes
    return result
  },{})

  const author = _.reduce(_.keys(hashmap), (a, b) => hashmap[a] > hashmap[b] ? a : b)

  return {
    author: author,
    likes: hashmap[author]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostBlogs,
  mostLikes
}
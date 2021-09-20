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
  let mostLikes = 0
  let favBlog = null

  for (let i=0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikes) {
      mostLikes = blogs[i].likes
      favBlog = blogs[i]
    }
  }

  return favBlog
}

const mostBlogs = (blogs) => {
  const thing = _.reduce(blogs, (result, blog) => {

    result[blog.author]
      ? result[blog.author].articles += 1
      : result[blog.author] = { author: result[blog.author], articles: 1 }

    return result
  }, [])

  console.log('single', thing[0])
  console.log('single type', typeof thing[0])
  console.log('whole type', typeof thing)

  return thing
}

module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostBlogs
}
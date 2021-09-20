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

module.exports = {
  dummy,
  totalLikes
}
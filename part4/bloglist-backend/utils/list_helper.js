// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  return blogList.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogList) => {
  let currentBest = null

  if (blogList.length < 1) return null

  for (const blog of blogList) {
    if (!currentBest || blog.likes > currentBest.likes) {
      currentBest = blog
    }
  }

  return currentBest
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

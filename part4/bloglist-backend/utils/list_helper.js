/* eslint-disable */
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

const mostBlogs = (blogList) => {
  if (blogList.length < 1) return null

  const blogsPerAuthor = {}

  for (const blog of blogList) {
    if (blogsPerAuthor[blog.author]) {
      blogsPerAuthor[blog.author]++
    } else {
      blogsPerAuthor[blog.author] = 1
    }
  }

  let bestAuthor = null

  for (const author in blogsPerAuthor) {
    if (!bestAuthor || blogsPerAuthor[author] > bestAuthor.blogs) {
      bestAuthor = { author, blogs: blogsPerAuthor[author] }
    }
  }

  return bestAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

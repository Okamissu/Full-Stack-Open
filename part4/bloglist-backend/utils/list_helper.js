// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  return blogList.reduce((acc, blog) => acc + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes,
}

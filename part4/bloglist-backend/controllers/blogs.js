const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')

  if (blog) response.json(blog)
  else response.status(404).end()
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { title, url, author } = request.body

    if (!title || !url || !author) {
      return response.status(400).json({ error: 'Missing properties' })
    }

    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }

    const blog = new Blog({
      title,
      url,
      author,
      user: user._id,
    })

    const result = await blog.save()

    user.blogs.push(result._id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (
    !Object.hasOwn(request.body, 'title') ||
    !Object.hasOwn(request.body, 'url')
  ) {
    return response.status(400).send('Missing properties')
  }

  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(200).end()
})

module.exports = blogsRouter

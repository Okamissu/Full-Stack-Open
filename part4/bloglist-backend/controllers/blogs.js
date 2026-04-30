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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'not authorized to delete this blog' })
    }

    await blog.deleteOne()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, url, author } = request.body

    if (!title || !url || !author) {
      return response.status(400).json({ error: 'Missing properties' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    const token = request.token
    if (!token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'not authorized to edit this blog' })
    }

    blog.title = title
    blog.url = url
    blog.author = author

    const updatedBlog = await blog.save()

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter

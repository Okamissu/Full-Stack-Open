const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (
    !Object.hasOwn(request.body, 'title') ||
    !Object.hasOwn(request.body, 'url')
  ) {
    response.status(400).send('Missing properties')
  }

  const blog = new Blog(request.body)

  const result = await blog.save()

  response.status(201).json(result)
})

module.exports = blogsRouter

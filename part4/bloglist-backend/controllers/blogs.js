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
    return response.status(400).send('Missing properties')
  }

  const blog = new Blog(request.body)

  const result = await blog.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter

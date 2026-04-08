const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) response.json(blog)
  else response.status(404).end()
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

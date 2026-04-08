const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('bloglist api', () => {
  test('blogs are returned as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs identifier is named "id"', async () => {
    const response = await api.get('/api/blogs')

    for (let blog of response.body) {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    }
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'The Doxie Blog',
      author: 'Leia',
      url: 'https://thedoxieblog.blogspot.com/',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogsAtEnd = response.body

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    assert(titles.includes('The Doxie Blog'))
  })

  test('adding a new blog without likes defaults it to 0', async () => {
    const newBlog = {
      title: 'The Kitty Blog',
      author: 'Dion',
      url: 'https://thekittyblog.blogspot.com/',
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('adding a new blog with title missing returns 400 bad request', async () => {
    const newBlog = {
      author: 'Dion',
      url: 'https://thekittyblog.blogspot.com/',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
  test('adding a new blog with url missing returns 400 bad request', async () => {
    const newBlog = {
      title: 'The Kitty Blog',
      author: 'Dion',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('deleting a single blog resource', async () => {
    await api.delete('/api/blogs/5a422a851b54a676234d17f7').expect(204)
  })

  test('updating the information of a single blog resource', async () => {
    const updatedBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    }
    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(updatedBlog)
      .expect(200)
  })
})

after(async () => {
  await mongoose.connection.close()
})

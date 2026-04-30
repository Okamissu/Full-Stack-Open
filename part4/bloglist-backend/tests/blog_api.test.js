const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let token = null
let initialBlogCount = 0

// SETUP

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'root user', passwordHash })
  await user.save()

  const loginResponse = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  })

  token = loginResponse.body.token

  // seed blogs THROUGH API (not DB directly)
  initialBlogCount = 0

  for (const blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)

    initialBlogCount++
  }
})

// BLOG LIST
describe('bloglist api', () => {
  test('blogs are returned as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogCount)
  })

  test('blogs identifier is named "id"', async () => {
    const response = await api.get('/api/blogs')

    for (let blog of response.body) {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    }
  })

  test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)
    assert(contents.includes('React patterns'))
  })
})

// VIEW SINGLE BLOG
describe('viewing a blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api.get(`/api/blogs/${blogToView.id}`).expect(200)

    assert.strictEqual(resultBlog.body.title, blogToView.title)
    assert.strictEqual(resultBlog.body.url, blogToView.url)
    assert.strictEqual(resultBlog.body.likes, blogToView.likes)
  })

  test('fails with status code 404 if note does not exist', async () => {
    const id = await helper.nonExistingId()

    await api.get(`/api/blogs/${id}`).expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    await api.get('/api/blogs/invalid123').expect(400)
  })
})

// CREATE BLOG
describe('creating blogs', () => {
  test('succeds with valid data + token', async () => {
    const newBlog = {
      title: 'The Doxie Blog',
      author: 'Leia',
      url: 'https://thedoxieblog.blogspot.com/',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs.length, initialBlogCount + 1)

    const titles = blogs.map((blog) => blog.title)
    assert(titles.includes('The Doxie Blog'))
  })

  test('fails without token', async () => {
    const newBlog = {
      title: 'The No Token Blog',
      author: 'NoToki',
      url: 'https://thedoxieblog.blogspot.com/',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })

  test('likes defaults it to 0', async () => {
    const newBlog = {
      title: 'No Likes Kitty Blog',
      author: 'Dion',
      url: 'https://nolikeskittyblog.blogspot.com/',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('adding a new blog with title missing returns 400 bad request', async () => {
    const newBlog = {
      author: 'Dion',
      url: 'https://thekittyblog.blogspot.com/',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('adding a new blog with url missing returns 400 bad request', async () => {
    const newBlog = {
      title: 'The Kitty Blog',
      author: 'Dion',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

// DELETE BLOG
describe('deteling blogs', () => {
  test('succeeds with valid token and owner', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const remainingBlogs = await helper.blogsInDb()

    assert.strictEqual(remainingBlogs.length, initialBlogCount - 1)
  })

  test('fails without token', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)
  })
})

// -------------------- UPDATE BLOG --------------------
describe('updating blogs', () => {
  test('succeeds with valid token and owner', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    const updated = {
      title: 'Updated Title',
      author: blog.author,
      url: blog.url,
      likes: 99,
    }

    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updated)
      .expect(200)

    const updatedBlogs = await helper.blogsInDb()
    const found = updatedBlogs.find((b) => b.id === blog.id)

    assert.strictEqual(found.title, 'Updated Title')
    assert.strictEqual(found.likes, 99)
  })
})

// -------------------- USERS --------------------
describe('users', () => {
  test('creates valid user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti',
      password: 'secret',
    }

    await api.post('/api/users').send(newUser).expect(201)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('creation fails if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'CJ',
      name: 'Carl Johnson',
      password: 'groovestreet',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('shorter'))
  })

  test('creation fails if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Groot',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('expected `username` to be unique'))
  })

  test('creation fails if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Guren',
      name: 'noyumia',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(
      result.body.error.includes('password must be at least 3 characters long'),
    )
  })

  test('creation fails if password is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Guren',
      name: 'noyumia',
      password: 'EY',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(
      result.body.error.includes('password must be at least 3 characters long'),
    )
  })
})

after(async () => {
  await mongoose.connection.close()
})

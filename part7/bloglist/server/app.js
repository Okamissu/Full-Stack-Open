const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const path = require('path')

const app = express()

logger.info(`connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) => logger.error(`error connecting to MongoDB: ${err.message}`))

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

const app = require('./app')
const logger = require('./utils/logger')
const { PORT } = process.env

app.listen(PORT, () => {
  logger.info(`Server running on port${PORT}`)
})

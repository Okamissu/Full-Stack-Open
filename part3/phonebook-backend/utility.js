const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const generateId = (idList) => {
  let newId
  do {
    newId = Math.floor(Math.random() * 1_000_000_000).toString()
  } while (idList.some((id) => id === newId))
  return newId
}

module.exports = {
  requestLogger,
  generateId,
}

const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, request.body)
  logger.info('-----')
  next()
}

const unknownEndpoint = (request, response) => response.status(404).send({error: "Unknown endpoint 404"})

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}

const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, request.body)
  logger.info('-----')
  next()
}

const tokenExtractor = (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) { return authorization.replace('Bearer ', '') }
    return null
  }

  request.token = getTokenFrom(request)
  next()
}

const userExtractor = async (request, response, next) => {
  const getUser = async (request) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) { return response.status(401).json({ error: 'Invalid token' }) }

    return await User.findById(decodedToken.id)
  }

  request.user = await getUser(request)
  next()
}

const unknownEndpoint = (request, response) => response.status(404).send({ error: 'Unknown endpoint 404' })

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Token missing or invalid' })
  } if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}

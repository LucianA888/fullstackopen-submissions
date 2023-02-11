const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
// implicitly wraps async functions with "try -> catch -> next(error)"
require('express-async-errors')

const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

mongoose.set('strictQuery', false)

logger.info('Connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to Mongo'))
  .catch((error) => logger.error('Error connecting to Mongo', error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

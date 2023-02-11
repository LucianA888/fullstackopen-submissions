const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { user } = request
  const { body } = request
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (blog.user._id.toString() === user.id) {
    await Blog.findByIdAndRemove(blogId)
    return response.status(204).end()
  }
  return response.status(400).json({ error: 'Blog post doesn\'t belong to the user' })
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const { user } = request
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (blog.user._id.toString() === user.id) {
    const { likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { likes }, { new: true, runValidators: true, context: 'query' })
    return response.json(updatedBlog)
  }
  return response.status(400).json({ error: 'Blog post doesn\'t belong to the user' })
})

module.exports = blogRouter

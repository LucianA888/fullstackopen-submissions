const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const initialBlogs = helper.initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('Fetching blogs', () => {
  test('HTTP GET responds with all of the blogs in JSON format', async () => {
    const response = await api.get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('Blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe("Creating blogs", () => {

  test('HTTP POST adds a new blog', async () => {
    const newBlog = {
      title: "Reacting to React",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 10
    }

    // Make a new blog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogTitles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(blogTitles).toContain("Reacting to React")
  })

  test('Blog likes property defaults to 0, if not provided', async () => {
    const newBlog = {
      title: "This post was not given a likes prop",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    }

    // Make a new blog
    const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('Blog with missing title or url gets "400 Bad Request" response', async () => {
    const noTitle = {
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    }

    const noUrl = {
      title: "This post was not given a likes prop",
      author: "Michael Chan"
    }

    await api.post('/api/blogs').send(noTitle).expect(400)
    await api.post('/api/blogs').send(noUrl).expect(400)

    // faulty blogs were not added
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})


describe("Modifying blogs", () => {
  test('Can update the likes of a blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const newLikes = blogToUpdate.likes + 100;

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
          .send({likes: newLikes})
          .expect(200)
          .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(newLikes)
    expect(response.body.likes).not.toBe(blogToUpdate.likes)
  })

  test('Can delete a blog', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDeletion[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()
    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)

    const titles = blogsAfterDeletion.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title)
  })
})


// Might need teardown file too
afterAll(async () => {
  await mongoose.connection.close()
})

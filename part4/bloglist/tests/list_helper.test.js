const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns 1', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('.totalLikes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  }) 

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, calculate the sum right', () => {
    const result = listHelper.totalLikes(helper.listWithManyBlogs)
    expect(result).toBe(36)
  })
  
})

describe('.favoriteBlog returns', () => {
  test('null when input is empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('first blog when input is a list of one blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual({title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('most liked blog out of a big list of blogs', () => {
    const result = listHelper.favoriteBlog(helper.listWithManyBlogs)
    expect(result).toEqual({ title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 })
  })
})

describe('.mostBlogs returns', () => {
  test('null when input is empty list', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('author (and their blog count), when input is a list of one blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1})
  })

  test('author with the most blogs (and their blog count), when input is a list of many blogs with different authors', () => {
    const result = listHelper.mostBlogs(helper.listWithManyBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  }) 
})

describe('.mostLikes returns', () => {
  test('null when input is empty list', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('author (and their like count), when input is a list of one blog', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('author with the most likes (and their like count), when input is a list of many blogs with different authors', () => {
    const result = listHelper.mostLikes(helper.listWithManyBlogs)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
  }) 
})

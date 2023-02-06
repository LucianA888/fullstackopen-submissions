const listHelper = require('../utils/list_helper')

// INPUTS

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

// TESTS

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
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, calculate the sum right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
  
})

describe('.favoriteBlog returns', () => {
  test('null when input is empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('first blog when input is a list of one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('most liked blog out of a big list of blogs', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[2])
  })
})

describe('.mostBlogs returns', () => {
  test('null when input is empty list', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('author (and their blog count), when input is a list of one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1})
  })

  test('author with the most blogs (and their blog count), when input is a list of many blogs with different authors', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  }) 
})

describe('.mostLikes returns', () => {
  test('null when input is empty list', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('author (and their like count), when input is a list of one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('author with the most likes (and their like count), when input is a list of many blogs with different authors', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
  }) 
})

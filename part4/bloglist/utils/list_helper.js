const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let max = blogs[0]
  blogs.forEach(blog => {
    if (max.likes < blog.likes) max = blog;
  })
  return max;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const blogCounts = _.countBy(blogs, 'author')
  const maxAuthor = _.maxBy(_.keys(blogCounts), author => blogCounts[author]);
  return {author: maxAuthor, blogs: blogCounts[maxAuthor]}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likeCounts = {};
  blogs.forEach(blog => {
    if (!likeCounts[blog.author]) likeCounts[blog.author] = 0;
    likeCounts[blog.author] += blog.likes;
  })

  const maxAuthor = _.maxBy(_.keys(likeCounts), author => likeCounts[author]);
  return {author: maxAuthor, likes: likeCounts[maxAuthor]}
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0)
    return 0

  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog  = (blogs) => {
  if (!blogs || blogs.length === 0)
    return []

  const { title, author, likes } = blogs.reduce ((max, cur) => {
    return cur['likes'] > max['likes'] ? cur : max
  }, blogs[0])

  return  { title, author, likes }
}

const mostBlogs  = (blogs) => {
  if (!blogs || blogs.length === 0)
    return []

  const blogsByAuthor ={}
  blogs.forEach ( item => {
    if(blogsByAuthor[item.author])
      blogsByAuthor[item.author]++
    else
      blogsByAuthor[item.author] = 1
  })

  let maxAuthor = null
  let maxBlogs = -Infinity

  for (let auth in blogsByAuthor) {
    if (blogsByAuthor[auth] > maxBlogs){
      maxBlogs = blogsByAuthor[auth]
      maxAuthor = auth
    }
  }
  return  { author: maxAuthor, blogs:maxBlogs }
}

const mostLikes  = (blogs) => {
  if (!blogs || blogs.length === 0)
    return []

  const likesByAuthor ={}
  blogs.forEach ( item => {
    if(likesByAuthor[item.author])
      likesByAuthor[item.author] += item.likes
    else
      likesByAuthor[item.author] = item.likes
  })

  let maxAuthor = null
  let maxBlogs = -Infinity

  for (let auth in likesByAuthor) {
    if (likesByAuthor[auth] > maxBlogs){
      maxBlogs = likesByAuthor[auth]
      maxAuthor = auth
    }
  }
  return  { author: maxAuthor, likes:maxBlogs }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      const getBlogs = async() => {
        setBlogs( (await blogService.getAll()).sort(compareBlogLikes))
      }
      getBlogs()
    }
  }, [])

  function compareBlogLikes(a, b) {
    return b.likes - a.likes
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setBlogs( (await blogService.getAll()).sort(compareBlogLikes) )
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setBlogs(null)
    setUser(null)
  }

  const addBlog = async(blogObject) => {
    const newBlog = await blogService.create(blogObject)
    if(newBlog){
      setBlogs([...blogs, newBlog].sort(compareBlogLikes))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }
  const udpateBlog = async(id, blogObject) => {
    const newBlog = await blogService.update(id, blogObject)

    if(newBlog){
      const newblogs = blogs.map(b => b.id === newBlog.data.id ? { ...b, likes:newBlog.data.likes } : b )
      setBlogs(newblogs.sort(compareBlogLikes))
    }
  }

  const removeBlog = async(id) => {
    const result = await blogService.remove(id)
    if(result.status === 204){
      const newblogs = blogs.filter(b => b.id !== id)
      setBlogs(newblogs.sort(compareBlogLikes))
    }
  }


  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification message={message}/>
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={message}/>
          <p>---{user.name}--- logged-in    <button onClick={handleLogout}>logout</button></p>

          <BlogForm createBlog={addBlog}/>
          {blogs && blogs.map(blog =>
            <Blog key={blog.id} userid={user.id} blog={blog} updateBlog={udpateBlog} removeBlog={removeBlog}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
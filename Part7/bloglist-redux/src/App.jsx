import { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import { initializeBlogs } from './reducers/blogReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm.jsx'
import Users from './components/Users.jsx'
import { singout } from './reducers/loginReducer.js'
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { getUserblog } from './reducers/userblogReducer'

const App = () => {

  const dispatch = useDispatch()

  let users = useSelector( ({ userblog }) => userblog )

  const user = useSelector( ({ login }) => login )

  const blogs = useSelector( ({ blogs }) => blogs )

  useEffect(() => {
    if (users.data.length===0 && !users.loading) {
      dispatch(getUserblog())
    }

    if (user) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === (match.params.id))
    : null

  const matchuser = useMatch('/users/:id')
  const userm = matchuser
    ? (users? users.data.find(b => b.id === (matchuser.params.id)) : null)
    : null

  const handleLogout = () => {
    dispatch(singout())
  }

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Item href="#" as="span">
              <em style={padding}>{user.name} logged-in</em>
              <button onClick={handleLogout}>logout</button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification/>
          <LoginForm/>
        </div> :
        <div>
          <Menu />
          <Routes>
            <Route path="/blogs" element={<BlogForm   user={user} />} />
            <Route path="/blogs/:id" element={<Blogs  userid={user.id} blog={blog} />} />
            <Route path="/"  element={<BlogForm user={user}/>}/>
            <Route path="/users" element={<Users users={users.data}  user={null}/>} />
            <Route path="/users/:id" element={<Users users={users.data}  user={userm} />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App
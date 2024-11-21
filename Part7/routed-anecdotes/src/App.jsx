import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'
import { Table, Form, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from '@mui/material'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (   
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/">anecdotes</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/create">create new</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/about">about</Link>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
   const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const {reset:resetContent, ...restContent} = content
  const {reset:resetAuthor, ...restAuthor} = author
  const {reset:resetInfo, ...restInfo} = info

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    navigate('/')
  }

  const resetInputs = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control
            type="input"
            {...restContent} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            type="input"
            {...restAuthor} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url for more info</Form.Label>
          <Form.Control
            type="input"{...restInfo} 
          />
        </Form.Group>
        <button variant="primary">create</button>
      </form>      
      <button onClick={resetInputs}>reset</button>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  
  const [notification, setNotification] = useState('')

  useEffect( () => {
    if(notification){
      setTimeout(() => {
        setNotification('')
      }, 5000);
    }
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  
  const Anecdote = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find( n => n.id === Number(id))
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        has {anecdote.votes} votes 
        <p>for more info see <Link to={anecdote.info}>{anecdote.info}</Link></p>

      </div>
    )
  }
  return (
    <Container>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        {notification} 
        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />       
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
          <Route path="/about" element={<About />}/>
          <Route path="/create" element={<CreateNew addNew={addNew}/>} />
        </Routes> 
      </Router>
      <Footer />
    </Container>
  )
}

export default App

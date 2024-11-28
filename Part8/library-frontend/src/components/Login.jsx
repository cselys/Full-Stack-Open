import { useState, useEffect  } from 'react'
import { Form, Button } from 'react-bootstrap'
import { LOGIN } from '../query'
import { useMutation } from '@apollo/client'

const Login= ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

useEffect(() => {
if ( result.data ) {
    const token = result.data.login.value
    setToken(token)
    localStorage.setItem('bookauthor-user-token', token)
}
}, [result.data])


if (!show) {
    return null
    }

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
      setUsername('')
      setPassword('')
  }

  return (
    <div>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>
  </div>
  )
}

export default Login
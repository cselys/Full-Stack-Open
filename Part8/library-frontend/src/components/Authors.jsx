import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BORN } from '../query'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [author, setAuthor] = useState('')

  const [updateBorn] = useMutation(UPDATE_BORN , {
    refetchQueries: [
      { query: ALL_AUTHORS },],})

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const setAuthorBorn = async () => {
    updateBorn({ variables: { name:author, setBornTo:parseInt(born) }})

    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <select name="selectedAuthor" value={author} onChange={(event) => {setAuthor(event.target.value)}}>
        {authors.map((a) => (
          <option key={a.name} value={a.name}>{a.name}</option>
        ))}
      </select>
       <div>
       born
          <input
            type="number"
            min='1900'
            max='2020'
            value={born}
            onChange={(event) => {setBorn(event.target.value)}}
          />
        </div>
        <button type="submit" onClick={setAuthorBorn}>update author</button>
    </div>
  )
}

export default Authors

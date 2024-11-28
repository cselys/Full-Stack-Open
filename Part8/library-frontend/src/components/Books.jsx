import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../query'
import { useState } from 'react'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const bookslist = filter ? books.filter(b => b.genres.includes(filter)) : books 

  const genreset = new Set()

  books.forEach(b => {
    b.genres.forEach ( g => {
      genreset.add(g)
    })
  })

  const genres = [...genreset]

  return (
    <div>
      <h2>books</h2>
      {filter && <p>in genre <b>{filter}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookslist.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>{
     genres.map(g =>(
      <button type='button' onClick={() => setFilter(g)} key={g}>{g}</button>  
     ) ) 
     } 
     <button type='button' onClick={() => setFilter(null)} key='all genres'>all genres</button> 
     </>
    </div>
  )
}

export default Books

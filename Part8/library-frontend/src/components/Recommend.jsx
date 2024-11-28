import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../query'
import { useEffect } from 'react'

const Recommend = (props) => {

  const result = useQuery(ME)

  const token = props.token
  
  useEffect( () => {
    result.startPolling(500)
    setTimeout( () => {result.stopPolling()}, 3000 )
    }, [token] )
  
  const bookresult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if(result.loading || bookresult.loading){
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }
  
  if (!result.data || !result.data.me) {
    return <div>No user data available</div>;
  }

  const filter = result.data?.me?.favoriteGenre
  const books = bookresult.data.allBooks

  const bookslist = filter ? books.filter(b => b.genres.includes(filter)) : books 

  return (    
  <div>
    <h2>Recommendations</h2>
    {filter && <p>books in your favorite genre <b>{filter}</b></p>}
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
  </div>
)
}

export default Recommend
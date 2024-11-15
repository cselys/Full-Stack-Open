import { useSelector, useDispatch } from 'react-redux'
import {voteQuote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({quotes, filter}) => {
      if( filter === '' ) 
        return quotes
      else 
        return quotes.filter( quote => quote.content.includes(filter))
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteQuote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`,3))
    }

    return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
} 

export default AnecdoteList
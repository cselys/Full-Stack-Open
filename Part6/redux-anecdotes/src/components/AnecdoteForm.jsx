import { useDispatch } from 'react-redux'
import {createQuote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addQuote = async(event) => {
        event.preventDefault()
        const content = event.target.quote.value
        event.target.quote.value = ''
        dispatch(createQuote(content))
        dispatch(setNotification(`you created ${content}`,3))
        
      }
    
      return <div>
                <h2>create new</h2>
                <form onSubmit={addQuote}>
                    <div><input name="quote"/></div>
                    <button>create</button>
                </form>
            </div>
} 

export default AnecdoteForm
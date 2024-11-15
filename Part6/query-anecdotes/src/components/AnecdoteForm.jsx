import { useQueryClient,useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createQuote } from '../request'

const AnecdoteForm = () => {
  const dispatch  = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newQoteMutation = useMutation({ mutationFn: createQuote,
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({type:'ADD', payload:`too short anecdote, must have length 5 or more`})
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newQoteMutation.mutate({ content, votes: 0 })
    dispatch({type:'ADD', payload:`Created new anecdote ${content}`})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

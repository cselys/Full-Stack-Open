import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient,useQuery, useMutation } from '@tanstack/react-query'
import { getQuotes, updateQuote } from './request'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getQuotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))
  
  const queryClient = useQueryClient()
  const updateQoteMutation = useMutation({ mutationFn:updateQuote,
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },})

  while ( result.isPending ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <h2>anecdote service is not available due to problems in server</h2>
  }

  const handleVote = (anecdote) => {
    const updated = {...anecdote, votes: anecdote.votes + 1}
    updateQoteMutation.mutate(updated)
    dispatch({type:'ADD', payload:`Voted '${anecdote.content}'`})
  }

  let anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  if(result.isSuccess)
    anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

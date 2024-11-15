import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const quoteSlice = createSlice ({
  name: 'quotes',
  initialState: [],
  reducers: {
    // addAnecdote(state, action) {
    //   return [...state, asObject(action.payload)]
    // },
    voteAnecdote(state, action) {
      const votedQuote = action.payload
      return state.map( quote => quote.id === votedQuote.id ? votedQuote: quote ).sort((a,b)=>b.votes-a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = quoteSlice.actions

export const initializeQuotes = () => {
  return async dispatch => {
    const quotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(quotes))
  }
}

export const createQuote = content => {
  return async dispatch => {
    const newQuote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newQuote))
  }
}

export const voteQuote = (quote) => {
  return async dispatch => {
    const votedQuote = {...quote, votes: quote.votes +1}
    const updatedQuote = await anecdoteService.updateQuote(quote.id, votedQuote)
    dispatch(voteAnecdote(updatedQuote))
  }
}

export default quoteSlice.reducer
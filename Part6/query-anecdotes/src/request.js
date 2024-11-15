import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getQuotes = () =>
    axios.get(baseUrl).then(res => res.data)
  
export const createQuote = (newQuote) =>
    axios.post(baseUrl, newQuote).then(res => res.data)

export const updateQuote = (udpateQuote) => 
    axios.put(`${baseUrl}/${udpateQuote.id}`, udpateQuote).then(res => res.data)
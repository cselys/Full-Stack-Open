import { useState, useEffect } from "react";
import { useApolloClient, useSubscription  } from '@apollo/client';
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { BOOK_ADDED, ALL_BOOKS } from './query'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bookauthor-user-token')
    setToken(loggedUserJSON)
  }, [])

  useSubscription(BOOK_ADDED,  {
    onData: ({ data, client }) => {
      const subbook = data?.data?.bookAdded

      if (!subbook) {
        console.error('book data is missing')
        return
      }
      console.log(subbook)

      updateCache(client.cache, { query: ALL_BOOKS }, subbook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("books")
  }
  if(token && page === 'login')
    setPage('books')
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
        <button onClick={() => setPage("login")}>login</button>
        ) : (
        <button onClick={logout}>logout</button>
        )}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommend")}>recommend</button>}
      </div>

      <Login show={page === "login"} setToken={setToken}/>

      <Authors show={page === "authors"} allowUpdate={token}/>

      <Books show={page === "books"}/>

      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} token={token}/>
    </div>
  );
};

export default App;

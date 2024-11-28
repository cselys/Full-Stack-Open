import { gql } from '@apollo/client'

const BOOK_SUMMARY = gql`
  fragment BookSummary on Book {
    title
    published 
    genres
    author {
      name
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            genres
        }
    }
`
export const UPDATE_BORN = gql`
    mutation udpateBorn($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            id
            born 
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me  {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookSummary
    }
  }
  ${BOOK_SUMMARY}
`
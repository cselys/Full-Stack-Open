const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author:  Author!
    genres: [String]
    id: ID! 
  }
  
  type Author {
    name: String!
    id: ID!
    born: Int
  }

  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

  type Token {
    value: String!
  }
  
  type AuthorBookCount{
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genres: [String]): [Book]
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
       title: String!
       published: Int!
       author: String!
       genres: [String!]!
    ): Book

    editAuthor(
        name:String!
        setBornTo:Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs
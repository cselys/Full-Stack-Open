const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
  you can remove the placeholder query once your first one has been implemented 
*/

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

  type AuthorBookCount{
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String]): [Book]
    allAuthors: [AuthorBookCount]
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
  }
`
const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async() => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({})
        // if(args.author && args.genres){
        //     return books.filter( book => book.author===args.author && 
        //         JSON.stringify(book.genres) === JSON.stringify(args.genres) )
        // }else if(args.author){
        //     return books.filter( book => book.author===args.author)
        // }else if(args.genres){
        //     return books.filter( book => JSON.stringify(book.genres)===JSON.stringify(args.genres))
        // }else
        //     return books
    },
    allAuthors: () => {
      return Author.find({})
        // const authorBookcount = books.reduce((acc, book) =>{
        //     const {author} = book;

        //     if(!acc[author]){
        //         const authorborn = authors.find( a => a.name === author)
        //         acc[author] = {name: author, born:authorborn.born, bookCount: 0}
        //     }
        //     acc[author].bookCount++;
        //     return acc;
        // }, {});
        
        // return Object.values(authorBookcount)
    },
  },

  Mutation: {
    addBook: (root, args) => {
        const book = {...args, id: uuidv4()}
        // books = books.concat(book)
        // if(authors.filter(a => a.author===args.author).length === 0){
        //     author = {
        //         name:args.author,
        //         id: uuidv4(),
        //         born:null
        //     }
        //     authors = authors.concat(author)
        // }
        // return book
    },
    editAuthor: (root, args) => {
        // const author = authors.find(a => a.name===args.name)
        // if(!author) return null
        // const updatedAuthor = {...author, born:args.setBornTo}
        // authors = authors.map (a => a.name===args.name ? updatedAuthor : a)
        // return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: false,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
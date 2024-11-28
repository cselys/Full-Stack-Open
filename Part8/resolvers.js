const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async() => await Book.collection.countDocuments(),
      authorCount: async() => await Author.collection.countDocuments(),
      allBooks: async (root, args) => {
          if(args.genres){
            return await Book.find({genres: args.genres}).populate('author', { name: 1 });
          }else
            return await Book.find({}).populate('author', { name: 1 });
      },
      allAuthors: async () => {
        const authors = await Author.find({})
        return authors
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
  
    Mutation: {
      addBook: async(root, args, {currentUser}) => {
        try
        {
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          const authorinfo = await Author.findOne({name:args.author})
          if(!authorinfo)
            throw new Error('Author not found');
         
          const book = new Book({...args, author:authorinfo._id})
          await book.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
          return book.populate('author') 
        }catch(error){
            throw new GraphQLError('saving book failed', {
              extensions:{
                code: 'BAD_BOOK_INPUT',
                invalidArgs: args.name,
                error
              }
            })
        }
      },

      editAuthor: async (root, args, {currentUser}) => {
        try
          {
            if (!currentUser) {
              throw new GraphQLError('not authenticated', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                }
              })
            }
            const author = await Author.findOneAndUpdate(
            {name:args.name},
            {born:args.setBornTo },
            {new: true}
          )
          if(!author) return null
          return author;
        }catch(error){
          throw new GraphQLError('saving author failed', {
            extensions:{
              code: 'BAD_AUTHOR_UPDATE',
              invalidArgs: { name: args.name, setBornTo: args.setBornTo },
              error
            }
          })
        }
      },
  
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs:{username: args.username, favoriteGenre: args.favoriteGenre},
                error
              }
            })
          })
      },
  
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },

    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        },
    },
  }

  module.exports = resolvers
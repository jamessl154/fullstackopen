const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const JWT_SECRET = process.env.SECRET_KEY

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
  
        if (args.author && args.genre) {
          let author = await Author.findOne({ name: args.author })
          return await Book.find({ author: author._id, genres: args.genre }).populate('author')
        }
  
        if (args.genre) return await Book.find({ genres: args.genre }).populate('author')
  
        if (args.author) {
          let author = await Author.findOne({ name: args.author })
          return await Book.find({ author: author._id }).populate('author')
        }
  
        else return await Book.find({}).populate('author')
      },
      
      // solved n + 1 select problem by modifying the schema to accomodate join query (populate)
      allAuthors: async () => {
        let authors = await Author.find({}).populate('books')
        return authors.map((x) => {
          return {
            name: x.name,
            born: x.born,
            books: x.books,
            id: x._id,
            bookCount: x.books.length
          }
        })
      },
      
      me: (root, args, context) => context.currentUser
    },
    Mutation: {
      addBook: async (root, args, context) => {
  
        if (!context.currentUser) throw new AuthenticationError('You must be logged in to add a book')
        // Find author ID from string args.author
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }

        // Append author ID to document
        let book = new Book({ ...args, author: author._id.toString() })

        try {
          // save book document
          await book.save()
          // update author document, append saved book ID to author's books array
          await author.updateOne({ books: author.books.concat(book._id) })
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        let populatedBook = await book.populate('author')

        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

        // populate author field
        return populatedBook
      },
      addAuthor: async (root, args) => {
        
        const author = new Author({ ...args })
  
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidaArgs: args
          })
        }
  
        return author
      },
      editAuthor: async (root, args, context) => {
  
        if (!context.currentUser) throw new AuthenticationError('You must be logged in to edit an Author')
  
        let author = await Author.findOne({ name: args.name })
  
        if (!author) throw new UserInputError('that Author does not exist in the database')
  
        let editedAuthor = { ...author._doc, born: args.setBornTo }
  
        return await Author.findByIdAndUpdate(author._id, editedAuthor, { new: true })
      },
      createUser: (root, args) => {
  
        const user = new User({ ...args })
  
        return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if (!user || args.password !== 'secret') {
          throw new UserInputError("wrong credentials")
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      }
    }
}

module.exports = resolvers
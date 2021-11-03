const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { UserInputError, AuthenticationError } = require('apollo-server-express')
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
      allAuthors: async () => {
  
        let authors = await Author.find({})
  
        let bookCountAuthors = authors.map( async (x) => {
          // map each author in authors to object in the type format we expressed
          // for each author asynchronously count the books that they have
          let bookCount = await Book.countDocuments({ author: x._id })
          return { 
            id: x._id.toString(),
            bookCount,
            name: x.name,
            born: x.born
          }
        })
  
        return bookCountAuthors
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
  
        if (!context.currentUser) throw new AuthenticationError('You must be logged in to add a book')
        // Find author ID from string args.author
        let author = await Author.findOne({ name: args.author })
        // Append author ID to document
        let book = new Book({ ...args, author: author._id.toString() })
        // save document
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
  
        // populate author field
        return book.populate('author')
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
    }
}

module.exports = resolvers
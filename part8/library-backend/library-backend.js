require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
// const JWT_SECRET = process.env.SECRET_KEY
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int!
    bookCount: Int
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    addAuthor(
      name: String!
      born: Int!
    ): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      /*
        if (args.author && args.genre) {
          let author = await Author.find({ name: args.author })
          return await Book.find({ author: author.name, genres: args.genre })
        }
        if (args.genre) return await Book.find({ genres: args.genre })

        if (args.author) {
          let author = await Author.find({ name: args.author })
          let book = await Book.find({ author: author.name })
        console.log({ ...book, author: { ...author } })
          return { ...book, author: { ...author } }
        }
        else
      */

      return await Book.find({}).populate('author')
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
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      // Find author ID from name
      let author = await Author.findOne({ name: args.author })
      // Append author ID to document
      let book = new Book({ ...args, author: author._id.toString() })
      // save document
      let savedBook = await book.save()
      // populate author field
      return savedBook.populate('author')
    },
    addAuthor: (root, args) => {
      
      const author = new Author({ ...args })
      
      return author.save()
    },
    editAuthor: async (root, args) => {
      
      let author = await Author.findOne({ name: args.name })

      if (!author) return null

      let editedAuthor = { ...author._doc, born: args.setBornTo }

      return await Author.findByIdAndUpdate(author._id, editedAuthor, { new: true })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
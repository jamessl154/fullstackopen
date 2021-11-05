import { gql } from '@apollo/client'

// fragment
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      born
      id
    }
  }
`

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      books {
        title
        id
      }
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooksByAuthorOrGenre($author: String, $genre: String) {
    allBooks (author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ADD_BOOK = gql`
  mutation addNewBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook (
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation changeBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor (name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`
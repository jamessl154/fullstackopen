import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooksByAuthorOrGenre($author: String, $genre: String) {
    allBooks (author: $author, genre: $genre) {
      title
      author {
        name
        born
        id
      }
      published
      id
      genres
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

export const ADD_BOOK = gql`
  mutation addNewBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook (
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        id
      }
      genres
      id
    }
  }
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
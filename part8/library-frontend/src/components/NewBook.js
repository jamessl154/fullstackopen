import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ME } from '../queries'

const NewBook = (props) => {
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    // Updating 3 views: Author, Book and Recommended
    // the authors view is dependent on bookCount
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    // https://www.apollographql.com/docs/react/caching/cache-interaction/#readquery
    update: (store, response) => {
      const meDataInStore = store.readQuery({ query: ME })
      // this is the 2nd lazyQuery that runs in Recommended component
      const recommendedDataInStore = store.readQuery({
        query: ALL_BOOKS,
        variables: {
          genre: meDataInStore.me.favoriteGenre,
        },
      })
      // Only modify the recommended query if the book added has the current
      // users favoriteGenre in its genres array
      if (response.data.addBook.genres.includes(meDataInStore.me.favoriteGenre)) {
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...recommendedDataInStore,
            allBooks: [ ...recommendedDataInStore.allBooks, response.data.addBook ]
          },
          variables: {
            genre: meDataInStore.me.favoriteGenre
          }
        })
      }
    }
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) return null

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, published, author, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook

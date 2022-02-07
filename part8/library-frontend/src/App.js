
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { useApolloClient } from '@apollo/client'
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, ALL_AUTHORS, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    // Ensure that the cache is updated correctly when this book is added
    // which means only modifying the cached queries where the book (ID) is not found

    // returns boolean depending on whether any of the
    // objects in the 1st param "array" match the 2nd param "object" 's id
    const includedIn = (array, object) => array.map(x => x.id).includes(object.id)

    // Books view
    const allBookStore = client.readQuery({ query: ALL_BOOKS })

    // only if we don't find the ID of the addedBook in the cache
    if (!includedIn(allBookStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBookStore.allBooks.concat(addedBook) }
      })
    }

    // Author view
    const allAuthorStore = client.readQuery({ query: ALL_AUTHORS })

    // find the matching author object of the addedBook in cache
    let foundAuthor = allAuthorStore.allAuthors.find((x) => x.name === addedBook.author.name)

    // proceed only if the addedBook ID is not yet in the author's books array
    if (foundAuthor && foundAuthor.books && !foundAuthor.books.map((x) => x.id).includes(addedBook.id)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          // rewrite cached query. In allAuthors array, only modify the
          // correct author object with the up-to-date books array
          allAuthors: allAuthorStore.allAuthors
            .map((x) => x.id === foundAuthor.id
              ? { ...x, books: x.books.concat(addedBook) }
              : x
            )
        }
      })
    }

    // Recommended View

    // only if logged in user
    if (token) {
      const meStore = client.readQuery({ query: ME })

      const recommendedStore = client.readQuery({
        query: ALL_BOOKS,
        variables: {
          genre: meStore.me.favoriteGenre
        }
      })

      if (!recommendedStore.allBooks.map((x) => x.id).includes(addedBook.id)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: {
            genre: meStore.me.favoriteGenre
          },
          data: {
            allBooks: recommendedStore.allBooks.concat(addedBook)
          }
        })
      }
    }
  }
  
  // useSubscription hook
  // https://www.apollographql.com/docs/react/data/subscriptions/#executing-a-subscription
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // console.log("subscriptionData", subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} has been added`)
      // on receiving subscription, update the cache with the new book, that updates the views
      updateCacheWith(addedBook)
    }
  })

  const logOut = () => {
    // remove token from local state to reset view
    setToken(null)
    // clear local storage
    localStorage.clear()
    // clear cache
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommended')}>recommended</button>
              <button onClick={logOut}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />
      
      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'}
        token={token}
      />

    </div>
  )
}

export default App
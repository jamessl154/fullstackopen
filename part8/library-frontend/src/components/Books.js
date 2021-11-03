import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setFilteredBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) return null

  if (result.loading) return <div>Loading...</div>

  // https://stackoverflow.com/a/9229821
  // filter out duplicate genres
  let genres = new Set()

  books.forEach((x) => x.genres.forEach((x) => genres.add(x)))

  const handleGenreFilter = (genre) => {
    setGenre(genre)
    setFilteredBooks(
      books.filter(x => x.genres.includes(genre))
    )
  }

  return (
    <div>
      <h2>books { genre ? <span> {'=>'} genre: {genre}</span> : null}</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {[...genres].map(genre =>
        <button key={genre} onClick={() => handleGenreFilter(genre)}>{genre}</button>
        )}
        <button 
          onClick={() => {
            setFilteredBooks(books)
            setGenre(null)
          }}
        >All</button>
    </div>
  )
}

export default Books
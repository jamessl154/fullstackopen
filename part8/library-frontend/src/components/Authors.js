  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [changeBirthYear] = useMutation(SET_BIRTHYEAR)

  if (!props.show) return null

  if (result.loading) return <div>Loading...</div>

  const authors = result.data.allAuthors

  const setBirthYear = (event) => {
    
    event.preventDefault()

    changeBirthYear({ variables: { name, setBornTo: Number(year) } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>DoB</th>
            <th>Books</th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set Birth Year</h2>
        <form onSubmit={setBirthYear}>
          Name: <input value={name} onChange={(event) => setName(event.target.value)} /><br />
          Born: <input value={year} onChange={(event) => setYear(event.target.value)} /><br />
          <button type="submit">Update Author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors

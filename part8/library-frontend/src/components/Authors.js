  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'
import Select from 'react-select'
// https://github.com/JedWatson/react-select

const Authors = (props) => {
  const [selectedName, setSelectedName] = useState(null)
  const [year, setYear] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [changeBirthYear] = useMutation(SET_BIRTHYEAR, {
    onError: (error) => console.log(error.graphQLErrors[0].message)
  })

  if (!props.show) return null

  if (result.loading) return <div>Loading...</div>

  const authors = result.data.allAuthors

  let options = [...authors.map((x) => {
    return {
      value: x.name,
      label: x.name
    }
  })]

  const setBirthYear = (event) => {
    
    event.preventDefault()

    changeBirthYear({ 
      variables: {
        name: selectedName.value,
        setBornTo: Number(year)
      }
    })

    setSelectedName(null)
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
              <td>{a.books.length}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set Birth Year</h2>
        <form onSubmit={setBirthYear}>
          <Select
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={options}
          />
          Born: <input value={year} type="number" onChange={(event) => setYear(event.target.value)} /><br />
          <button type="submit">Update Author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors

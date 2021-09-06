import React, { useState, useEffect } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ search, setSearch ] = useState([])

  const nameChange = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)
  const filterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    setSearch(persons.filter(x => 
        x.name.slice(0, filter.length).toUpperCase()
        ===
        filter.toUpperCase()
      ))
  }
  , [filter, persons])

  const submitForm = (event) => {
    
    event.preventDefault()

    if (persons.findIndex(
        (obj) => obj.name === newName) !== -1
      ) {
        alert(`${newName} is already added to the phonebook`)
    }

    else {

      const newObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newObject))
      setNewName('')
    }
  }
  console.log(search)
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={filterChange} value={filter} /></div>
      <h2>Add a new</h2>
      <form onSubmit={submitForm}>
        <div>name: <input onChange={nameChange} value={newName} /></div>
        <div>number: <input onChange={numberChange} value={newNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>

      {
        search != 0
        ? search.map((x) => <p key={x.name}>{x.name} {x.number}</p>)
        : persons.map((x) => <p key={x.name}>{x.name} {x.number}</p>)
      }

    </div>
  )
}

export default App
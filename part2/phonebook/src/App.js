import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  // controlled components
  const nameChange = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)
  const filterChange = (event) => setFilter(event.target.value)

  // On every render re-evaluating list of numbers
  let displayList = []

  // Initially used a setSearch state that was called in a useEffect dependent
  // on persons and filter. That worked but added alot more complexity at the
  // tradeoff of now having to re-evaluate each render.
  // (newNumber or newName state changes too)
  if (persons.length !== 0 && filter.length !== 0) {
    displayList = persons.filter(
      (x) => (x.name.slice(0, filter.length).toUpperCase() === filter.toUpperCase())
    )
  } else if (filter.length === 0) {
    displayList = persons
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(x => {
        setPersons(x.data)
      })
  }, [])

  const submitForm = (event) => {
    
    event.preventDefault()

    // using findIndex, -1 shows no match between each persons.name and newName
    // Not -1 === match, trigger alert and not added to persons
    if (persons.findIndex(
          (obj) => obj.name.toUpperCase() === newName.toUpperCase()) !== -1
        ) {
            alert(`${newName} is already added to the phonebook`)
          }

    else {

      // create new object with the states of the input fields for name and number
      const newObject = {
        name: newName,
        number: newNumber
      }

      // concatenate that new object to the end of the persons array,
      // need to use concat with state here to not manipulate the previous state
      setPersons(persons.concat(newObject))
      // Clear the states which clears the input fields
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={filterChange} value={filter} />
      
      <h2>Add a new</h2>

      <PersonForm 
        onSubmit={submitForm}
        nameChange={nameChange}
        numberChange={numberChange}
        nameValue={newName}
        numberValue={newNumber}
      />

      <h2>Numbers</h2>

      <Persons list={displayList} />

    </div>
  )
}

export default App
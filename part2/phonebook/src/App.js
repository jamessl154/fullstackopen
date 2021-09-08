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
  const [ search, setSearch ] = useState([])

  // controlled components
  const nameChange = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)
  const filterChange = (event) => setFilter(event.target.value)

  // useEffect only called if:
  // 1. Person is added to persons by submitting form
  // 2. Filter state changes by changing filter input
  
  // setSearch set to new array where, for each sliced name string from persons
  // (same length as filter, case insensitive),
  //  if matches the input filter add that person to new array
  
  // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
  // useEffect is necessary here because when we have multiple setState() calls, 
  // React is batching our setState() calls into a single udpdate. Our setSearch
  // is finding matches between the "old" filter state and the sliced
  // persons strings i.e. Numbers list updating is 1 input behind

  useEffect(() => {
    if (persons.length !== 0) {
      setSearch(
        persons.filter(x => 
          x.name.slice(0, filter.length).toUpperCase()
          ===
          filter.toUpperCase()
        )
      )
    }
  }
  , [filter, persons])

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

  // Logic that decides which list to render
  let displayList = persons
  // search stores matches between the filter input and the phonebook (persons array)
  // search not empty === matches
  if (search.length !== 0) {
    displayList = search
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
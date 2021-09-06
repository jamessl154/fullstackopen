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

  // controlled components
  const nameChange = (event) => setNewName(event.target.value)
  const numberChange = (event) => setNewNumber(event.target.value)
  const filterChange = (event) => setFilter(event.target.value)

  // useEffect here is dependent on the filter and the persons states
  // It only calls setSearch and rerenders if:
  // 1.   a new person is added to persons by submitting form, if that person's
  //      name matches the filter it will be immediately shown on screen
  // 2.   the filter state changes (change to the filtering input field)
  // setSearch is updating the search state to be filtered elements from
  // the persons array only where the condition is true. We've sliced
  // that name property of the object to be the same size as the filter input
  // length so that we can trigger re-renders before the full name has been 
  // typed in if they match (case-insensitive)
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

    // findIndex returns -1 if there is no index found in the entire array
    // so here anything that isn't -1 shows a match between the name in persons
    // and the name in state newName which triggers an alert and doesn't
    // add it to the persons array.
    // Added toUpperCase() to make the check case insensitive
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
      // triggering a re-render
      // need to use concat with state here to not manipulate the previous state
      setPersons(persons.concat(newObject))
      // Clear the states and input fields
      setNewName('')
      setNewNumber('')
    }
  }

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
        /* 
        if the search state is not empty (meaning there are matches), 
        map the search array as <p> elements in this format for the DOM
        else (no matches)
        map the persons array to this format for the DOM
        */
        search !== 0
        ? search.map((x) => <p key={x.name}>{x.name} {x.number}</p>)
        : persons.map((x) => <p key={x.name}>{x.name} {x.number}</p>)
      }

    </div>
  )
}

export default App
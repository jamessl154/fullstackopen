import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const inputChange = (event) => setNewName(event.target.value)

  const submitForm = (event) => {

    event.preventDefault()

    if (persons.findIndex(
        (obj) => obj.name === newName) !== -1
      ) {
        alert(`${newName} is already added to the phonebook`)
    }
    
    else {

      const newObject = {
        name: newName
      }

      setPersons(persons.concat(newObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitForm}>
        <div>
          name: <input onChange={inputChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((x) => 
        <p key={x.name}>{x.name}</p>
      )}

    </div>
  )
}

export default App
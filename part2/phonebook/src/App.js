import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const inputChange = (event) => setNewName(event.target.value)

  const submitForm = (event) => {
   
    const a = {
      name: newName
    }

    event.preventDefault()
    setPersons(persons.concat(a))
    setNewName('')
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
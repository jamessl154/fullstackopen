import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState('')
  const [search, setSearch] = useState('')

  console.log(countries)
  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(x => {
      setCountries(x.data)
    })
  }, [])

  return (
    <div>
      <h2>Countries:</h2>
    
      <input 
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

    </div>
  )
}

export default App;

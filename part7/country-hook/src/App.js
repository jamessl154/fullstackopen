import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(result => {
        result.found = true
        setCountry(result)
      })
      .catch(error => setCountry({ found: false }))
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  let data = country.data[0]
  let name = data.name.common

  return (
    <div>
      <h3>{name} </h3>
      <div>capital {data.capital[0]} </div>
      <div>population {data.population}</div> 
      <img src={data.flags.png} height='100' alt={`flag of ${name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  // state 'name' passed to useCountry, when name changes triggers re-evaluation of country
  // due to the dependency array of the useEffect including the 'name' prop on Line 30
  // https://reactjs.org/docs/hooks-custom.html#tip-pass-information-between-hooks

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

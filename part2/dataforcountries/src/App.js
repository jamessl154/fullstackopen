import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const OneCountry = ({ props }) => {
  // https://www.freecodecamp.org/news/array-and-object-destructuring-in-javascript/
  // Object destructuring, props is the key here
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Capital: {props.capital}</p>
      <p>Population: {props.population}</p>
      <h2>Languages</h2>
      <ul>
        {props.languages.map((x) => <li key={x.name}>{x.name}</li>)}
      </ul>
      <img style={{ maxWidth: 150 }} src={props.flag} alt={props.name} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState('')
  const [search, setSearch] = useState('')

  const atlas = useRef()

  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(x => {
      atlas.current = x.data
    })
  }, [])

  useEffect(() => {
    if (atlas.current !== undefined) {
      setCountries(atlas.current.filter((x) =>
        x.name.slice(0, search.length).toUpperCase()
        ===
        search.toUpperCase()
        )
      )
    }
  }, [search])

  // setOne takes name of 1 country as argument, x, then sets the countries state
  // to be that country
  const setOne = (x) => setCountries(countries.filter((y) => y.name === x))

  let countryList;

  if (countries.length === 0) {
    countryList = <p>No countries</p>
  }
  else if (countries.length > 10) {
    countryList = <p>Too many countries</p>
  }
  else if (countries.length === 1) {
    countryList = countries.map((x) => 
      <OneCountry key={x.name} props={x} />
    )
  }
  else {
    countryList = countries.map((x) => (
        <div key={x.name}> 
          <span>{x.name}</span>{' '}
          <button onClick={() => setOne(x.name)}>show</button>
        </div>
      )
    )
  }

  return (
    <div>
      <h2>Find a Country:</h2>
    
      <input 
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <div>{countryList}</div>

    </div>
  )
}

export default App;
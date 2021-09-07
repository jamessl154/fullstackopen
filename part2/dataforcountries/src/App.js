import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'


// const SingleCountry = (props) => {
  
//   const lang = props.languages.map((x) => <li>{x.name}</li>)
  
//   return (
//     <div>
//       capital: {props.capital}
//       population: {props.population}
//       <h2>languages</h2>
//       <ul>
//         {lang}
//       </ul>
//     </div>
//   )
// }

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

  let countryList;
  console.log(countries)
  if (countries.length === 0) {
    countryList = <p>No countries</p>
  }
  else if (countries.length > 10) {
    countryList = <p>Too many countries</p>
  }
  else if (countries.length === 1) {
    countryList = countries.map((x) => <p key={x.name}>{x.name}</p>)
  }
  else {
    countryList = countries.map((x) => <p key={x.name}>{x.name}</p>)
  }

  // <SingleCountry key={x.name} country={x} />

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

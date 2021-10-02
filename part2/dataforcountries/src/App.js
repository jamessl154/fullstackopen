import React, { useState, useEffect, useRef } from 'react'
import Country from './components/Country'
import OneCountry from './components/OneCountry'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState('')
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState('')
  
  // since we want to keep a reference to all of the 250 countries, useRef
  const atlas = useRef()

  // This runs once on page load
  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(x => {
      atlas.current = x.data
    })
  }, [])

  // only when our filtering input search is changed, set the countries
  // state to matches between search and 
  // search-length-sliced-subtrings of countries in atlas
  useEffect(() => {
    if (atlas.current !== undefined) {
      setCountries(atlas.current.filter((x) =>
        x.name.common.slice(0, search.length).toUpperCase()
        ===
        search.toUpperCase()
        )
      )
    }
  }, [search])

  // https://egghead.io/lessons/react-make-http-requests-with-react-e06e2e96
  // need to use a state to trigger a rerender and store weather
  // inside a useEffect because querying an API is a side effect.
  // Dependent on countries, only calls API 
  // when countries contains a single country
  // we can access its properties using countries[0]
  useEffect(() => {
    if (countries.length === 1) {
      let params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: countries[0].capital[0]
      }
      axios
      // https://weatherstack.com/documentation
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })
      .catch(e => {
        console.log(e)
      })
    }
  }, [countries])

  // setOne takes name of 1 country as argument, x, then sets the countries state
  // to be that country
  const setOne = (x) => setCountries(countries.filter((y) => y.name.common === x))

  let countryList;

  if (search.length === 0) {
    countryList = <p>Type a country name.</p>
  }
  else if (countries.length === 0) {
    countryList = <p>No countries found.</p>
  }
  else if (countries.length > 10) {
    countryList = <p>Too many countries found, specify further.</p>
  }
  // only render once the weather API has setWeather
  else if (countries.length === 1 && weather !== '') {
    countryList = <OneCountry 
                    key={countries[0].name.common}
                    country={countries[0]}
                    weather={weather.current} 
                  />
  }
  else {
    countryList = countries.map((x) => (
        // each component mapped will be passed an onClick 
        // that references their object name in countries
        <Country 
          key={x.name.common}
          name={x.name.common}
          onClick={() => setOne(x.name.common)}
        />
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

      <div>
        {countryList}
      </div>

    </div>
  )
}

export default App;
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

// https://www.freecodecamp.org/news/array-and-object-destructuring-in-javascript/
// Object destructuring, props is a key here
const OneCountry = ({ props, weather }) => {
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
      <h2>Weather in {props.capital}:</h2>
      {weather.weather_icons.map((x) => <img key={x} src={x} alt="Drawing of the current weather" />)}
      {weather.weather_descriptions.map((x) => <p key={x} ><b>{x}</b></p>)}
      <p><b>Temperature:</b> {weather.temperature}° C</p>
      <p><b>Wind:</b> {weather.wind_speed} mph</p>
      <p><b>Direction:</b> {weather.wind_dir}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState('')
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState('')
  
  // since we want to keep a reference to all of the 250 countries, useRef
  const atlas = useRef()

  // This runs once on page load
  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(x => {
      atlas.current = x.data
    })
  }, [])

  // our filtering input, search, sets countries where matches are found in atlas
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

  // https://egghead.io/lessons/react-make-http-requests-with-react-e06e2e96
  // need to use a state to trigger a rerender and store weather
  useEffect(() => {
    if (countries.length === 1) {
      let params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: countries[0].capital
      }
      axios
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
  const setOne = (x) => setCountries(countries.filter((y) => y.name === x))

  let countryList;

  if (search.length === 0) {
    countryList = <p>Type the name here</p>
  }
  else if (countries.length === 0) {
    countryList = <p>No countries</p>
  }
  else if (countries.length > 10) {
    countryList = <p>Too many countries</p>
  }
  else if (countries.length === 1 && weather !== '') {
    countryList = countries.map((x) => 
      <OneCountry key={x.name} props={x} weather={weather.current} />
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
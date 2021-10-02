import React from 'react'

// https://www.freecodecamp.org/news/array-and-object-destructuring-in-javascript/
// Object destructuring, country is a key here
const OneCountry = ({ country, weather }) => {

    let languageArray = []

    for (let x in country.languages) {
        languageArray.push(country.languages[x])
    }

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {languageArray.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <img style={{ maxWidth: 150 }} src={country.flags.png} alt={`The flag of ${country.name.common}`} />

            <h2>Weather in {country.capital}:</h2>
            <div>
                <img src={weather.weather_icons[0]} alt="Drawing of the weather" />
                <p><b>{weather.weather_descriptions[0]}</b></p>
            </div>

            <p><b>Temperature:</b> {weather.temperature}° C</p>
            <p><b>Wind:</b> {weather.wind_speed} mph</p>
            <p><b>Direction:</b> {weather.wind_dir}</p>
        </div>
    )
}

export default OneCountry
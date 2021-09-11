import React from 'react'

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
            <img style={{ maxWidth: 150 }} src={props.flag} alt={`The flag of ${props.name}`} />

            <h2>Weather in {props.capital}:</h2>
            <div>
                {weather.weather_icons.map((x) => <img key={x} src={x} alt="Drawing of the weather" />)}
                {weather.weather_descriptions.map((x) => <p key={x} ><b>{x}</b></p>)}
            </div>

            <p><b>Temperature:</b> {weather.temperature}° C</p>
            <p><b>Wind:</b> {weather.wind_speed} mph</p>
            <p><b>Direction:</b> {weather.wind_dir}</p>
        </div>
    )
}

export default OneCountry
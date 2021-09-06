import React from 'react'
import Person from './Person'

const Persons = (props) => (
    // Map the list passed here as a prop to display a Person component
    // for each object in the array with a unique key
    props.list.map((x) => <Person key={x.name} name={x.name} number={x.number}/>)
)

export default Persons
import React from 'react'

const Country = (props) => (
    <div> 
        <span>{props.name}</span>{' '}
        <button onClick={props.onClick}>show</button>
    </div>
)

export default Country
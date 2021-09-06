import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.onSubmit}>
        <div>name: 
            <input 
            onChange={props.nameChange} 
            value={props.nameValue} 
            />
        </div>
        <div>number: 
            <input 
            onChange={props.numberChange} 
            value={props.numberValue} 
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm
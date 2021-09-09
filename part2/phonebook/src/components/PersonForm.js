import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.onSubmit}>
        <div>Name: 
            <input 
            onChange={props.nameChange} 
            value={props.nameValue} 
            />
        </div>
        <div>Phone: 
            <input 
            onChange={props.numberChange} 
            value={props.numberValue} 
            />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
)

export default PersonForm
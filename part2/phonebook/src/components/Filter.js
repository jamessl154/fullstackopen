import React from 'react'

const Filter = (props) => (
    <div>
        <span>
            Find an existing contact:{' '}
            <input onChange={props.onChange} value={props.value} />
        </span>
    </div>
)

export default Filter
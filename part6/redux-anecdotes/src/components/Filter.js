import React from 'react'
import { formInput } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    props.formInput(event.target.value)
  }

  const style = {
    margin: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { formInput }
)(Filter)
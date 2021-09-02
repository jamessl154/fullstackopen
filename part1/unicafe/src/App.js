import React, { useState } from 'react'

const Button = ({addReview, ...props}) => {

  return (
    <div>
      <label htmlFor={props.rating}>{props.rating}</label>
      <button id={props.rating} onClick={addReview}>{props.counter}</button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [rating, setRating] = useState('')
  
  return (
    <>
      <h1>Rate your experience!</h1>
      <Button rating="good" counter={good} addReview={() => setGood(good + 1)} />
      <Button rating="neutral" counter={neutral} addReview={() => setNeutral(neutral + 1)} />
      <Button rating="bad" counter={bad} addReview={() => setBad(bad + 1)} />
    </>
  )
}

export default App
import React, { useState } from 'react'

const Button = ({addReview, ...props}) => {

  return (
    <div>
      <label htmlFor={props.rating}>{props.rating}</label>
      <button id={props.rating} onClick={addReview}>{props.counter}</button>
    </div>
  )
}

const Stats = (props) => {

  const averageScore = (props.score / props.all).toFixed(2)
  
  const percentPositive = (props.good * 100 / props.all).toFixed(2)

  return (
    <div>
      <h2>Total ratings: {props.all}</h2>
      <h2>Average score: {isNaN(averageScore) ? 0 : (averageScore)}</h2>
      <h2>Percentage of positive ratings: {isNaN(percentPositive) ? 0 : (percentPositive)} %</h2>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [rating, setRating] = useState('')

  const all = good + neutral + bad
  const score = good - bad

  return (
    <>
      <h1>Rate your experience!</h1>
      <Button rating="good " counter={good} addReview={() => setGood(good + 1)} />
      <Button rating="neutral " counter={neutral} addReview={() => setNeutral(neutral + 1)} />
      <Button rating="bad " counter={bad} addReview={() => setBad(bad + 1)} />
      <Stats good={good} neutral={neutral} bad={bad} all={all} score={score} />
    </>
  )
}

export default App
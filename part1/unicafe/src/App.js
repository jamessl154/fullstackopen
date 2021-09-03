import React, { useState } from 'react'

const Button = ({addReview, ...props}) => {

  return (
    <div>
      <button onClick={addReview}>{props.rating}</button>
    </div>
  )
}

const Stats = (props) => {

  const averageScore = (props.score / props.all).toFixed(2)

  const percentPositive = (props.good * 100 / props.all).toFixed(2)

  if (props.all != 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>Good: {props.good}</p>
        <p>Neutral: {props.neutral}</p>
        <p>Bad: {props.bad}</p>
        <p>Total ratings: {props.all}</p>
        <p>Average score: {isNaN(averageScore) ? 0 : (averageScore)}</p>
        <p>Percentage of positive ratings: {isNaN(percentPositive) ? 0 : (percentPositive)} %</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No Feedback Given</p>
      </div>
    )
  }
}

const App = () => {
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
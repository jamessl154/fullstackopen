import React, { useState } from 'react'

const Button = ({addReview, ...props}) => {

  return (
    <button onClick={addReview}>{props.rating}</button>
  )
}

const StatsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Stats = (props) => {
  const averageScore = (props.score / props.all).toFixed(2)
  const percentPositive = (props.good * 100 / props.all).toFixed(2) + "%"

    return (
      <div>
        <h2>Statistics</h2>
        { props.all > 0 &&
        <table>
          <tbody>
            <StatsLine text="Good: " value={props.good} />
            <StatsLine text="Neutral: " value={props.neutral} />
            <StatsLine text="Bad: " value={props.bad} />
            <StatsLine text="Total ratings: " value={props.all} />
            <StatsLine text="Average score: " value={averageScore} />
            <StatsLine text="Percentage of positive ratings: " value={percentPositive} />
          </tbody>
        </table>
        }
        {props.all === 0 &&
          <p>No Feedback Given</p>
        }
      </div>
    )
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
      <Button rating="Good " addReview={() => setGood(good + 1)} />
      <Button rating="Neutral " addReview={() => setNeutral(neutral + 1)} />
      <Button rating="Bad " addReview={() => setBad(bad + 1)} />
      <Stats good={good} neutral={neutral} bad={bad} all={all} score={score} />
    </>
  )
}

export default App
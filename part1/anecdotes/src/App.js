import React, { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
  // use a lazy initializer for the votes state
  const [votes, setVotes] = useState(() => new Array(anecdotes.length).fill(0))
  
  // generates a random index corresponding to the anecdotes array
  const anecdotesRandom = () => Math.round(Math.random()*(anecdotes.length-1))

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // addVote is a function expression that modifies the votes state with setVotes
  // When it's called maps the votes array, where x is an element in the array and y is the index.
  // It only increments the index of the votes array that is the same value as the state, selected,
  // which is the anecdote rendered on the page. ".map" makes a copy of the array, applies the
  // mapping function, and returns the new array which maintains the array between states
  const addVote = () => setVotes(votes.map((x, y) => (y === selected) ? x + 1 : x))

  return (
    <div>
      <h2>{anecdotes[selected]}</h2>
      <h4>This anecdote has {votes[selected]} votes</h4>
      <Button text="Vote" onClick={addVote} />
      <Button text="Next Anecdote" onClick={() => setSelected(anecdotesRandom)} />
    </div>
  )
}

export default App
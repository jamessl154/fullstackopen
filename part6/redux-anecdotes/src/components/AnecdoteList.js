import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector(({anecdotes, notification, filter}) => {
    // state.filter is initialized as the empty string
    if (filter.length) {
      // .filter() filters in elements if the callback executed 
      // returns true
      return anecdotes.filter((x) => {
        return (
          x.content
          // make case insensitive string comparison
          .toUpperCase()
          // .indexOf() returns -1 if not found or the positive index
          // of the character,
          .indexOf(filter.toUpperCase()) >= 0)
      })
    }

    return anecdotes
  })
  const timeoutID = useSelector(({anecdotes, notification}) => {
    return notification.timeoutID
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    // console.log('vote', anecdote.id)
    dispatch(addVote(anecdote))
    dispatch(setNotification(
      `You voted for "${anecdote.content}"`,
      5,
      timeoutID
    ))
  }

  return (
  <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>
  )
}

export default AnecdoteForm
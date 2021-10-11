import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdote.value))
        dispatch(setNotification(`You added the anecdote "${event.target.anecdote.value}"`))
        setTimeout(() => dispatch(removeNotification()), 5000)
        event.target.anecdote.value = ''
    }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
        </form>
    </div>
    )
}

export default AnecdoteForm
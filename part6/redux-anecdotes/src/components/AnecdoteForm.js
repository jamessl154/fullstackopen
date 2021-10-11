import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        console.log('event', event)
        dispatch(addAnecdote(event.target.anecdote.value))
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
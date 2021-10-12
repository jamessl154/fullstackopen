import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        let anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        // dispatch actions to stores (update state) asynchronously with thunk
        dispatch(addAnecdote(anecdote))
        dispatch(setNotification(`You added the anecdote "${anecdote}"`))
        setTimeout(() => dispatch(removeNotification()), 5000)
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
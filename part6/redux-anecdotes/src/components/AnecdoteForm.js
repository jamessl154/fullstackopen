import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = async (event) => {

        event.preventDefault()

        // first communicate with backend, the anecdote string 
        // gets assigned id and votes 0
        const newAnecdote = 
        await anecdoteService
            .createNew(event.target.anecdote.value)

        // then with returned object dispatch actions to stores (update state)
        dispatch(addAnecdote(newAnecdote))
        dispatch(setNotification(`You added the anecdote "${newAnecdote}"`))
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
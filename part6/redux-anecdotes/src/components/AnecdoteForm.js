import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        let anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        // dispatch actions to stores (update state) asynchronously with thunk
        props.addAnecdote(anecdote)
        props.setNotification(`You added the anecdote "${anecdote}"`, 5)
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

// exported connected component has access to the store through its props
export default connect(
    // mapStateToProps first argument should be declared null if no state to map
    null,
    // mapDispatchToProps consisting of imported action creators
    { addAnecdote, setNotification }
)(AnecdoteForm)
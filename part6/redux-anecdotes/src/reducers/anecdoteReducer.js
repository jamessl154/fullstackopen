import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      let anecdote = action.anecdoteFromServer
      // map a new array only replacing the updated anecdote
      let newAnecdotes = state.map(a => a.id === anecdote.id ? anecdote : a)
      // sort new state by most votes
      newAnecdotes.sort((a, b) => b.votes - a.votes)
      return newAnecdotes
    case 'NEW_ANECDOTE':
      // console.log(action.data)
      return state.concat(action.anecdoteObject)
    case 'INITIALIZE_ANECDOTES':
      // initially sort on load
      let sortedAnecdotes = action.allAnecdotes.sort((a, b) => b.votes - a.votes)
      return sortedAnecdotes
    default:
      return state
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    let updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const anecdoteFromServer = 
    await anecdoteService.addVote(anecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      anecdoteFromServer
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteObject = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      anecdoteObject
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const allAnecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INITIALIZE_ANECDOTES',
      allAnecdotes
    })
  }
}

export default anecdoteReducer
const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const idOfVotedAnecdote = action.id
      let votedAnecdote = state.find((x) => x.id === idOfVotedAnecdote)
      votedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
      let newAnecdotes = state.filter((x) => x.id !== idOfVotedAnecdote)
      newAnecdotes = [ votedAnecdote, ...newAnecdotes ]
      return newAnecdotes
    case 'NEW_ANECDOTE':
      // console.log(action.data)
      return state.concat(action.anecdoteObject)
    case 'SORT_ANECDOTES':
      state.sort((a, b) => b.votes - a.votes)
      return state
    case 'INITIALIZE_ANECDOTES':
      return action.allAnecdotes
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const addAnecdote = (anecdoteObject) => {
  return {
    type: 'NEW_ANECDOTE',
    anecdoteObject
  }
}

export const sortAnecdotes = () => {
  return {
    type: 'SORT_ANECDOTES'
  }
}

export const initializeAnecdotes = (allAnecdotes) => {
  return {
    type: 'INITIALIZE_ANECDOTES',
    allAnecdotes
  }
}

export default anecdoteReducer
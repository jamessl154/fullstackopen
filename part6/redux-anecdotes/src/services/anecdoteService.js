import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  // the json-server assigns the resource an ID
  return response.data
}

const addVote = async (id, update) => {
  const response = await axios.put(`${baseUrl}/${id}`, update)
  return response.data
}

const anecdoteService = {
  getAll,
  createNew,
  addVote
}

export default anecdoteService
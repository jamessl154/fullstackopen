import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// Format correctly for use
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (newBlog) => {

  // https://github.com/axios/axios#instance-methods
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const blogService = { getAll, addBlog, setToken }

export default blogService
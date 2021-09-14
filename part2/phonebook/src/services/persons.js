import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = newObject => axios.post(baseUrl, newObject)

const goDelete = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

// Assign object to a variable before exporting as module default  
// import/no-anonymous-default-export
const personService = { getAll, create, update, goDelete }

export default personService
import axios from 'axios'

// for part 2
// const baseUrl = `http://localhost:3001/persons`

// for part 3
const baseUrl = `/api/persons`

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = (newPersonObj) => axios.post(baseUrl, newPersonObj).then(res => res.data)

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

const update = (id, newPersonObj) => axios.put(`${baseUrl}/${id}`, newPersonObj).then(res => res.data)


export default { getAll, create, deletePerson, update }
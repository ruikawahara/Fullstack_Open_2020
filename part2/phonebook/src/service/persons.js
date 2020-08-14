import axios from 'axios'

const baseUrl = `http://localhost:3001/persons`

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = (newNoteObj) => axios.post(baseUrl, newNoteObj).then(res => res.data)

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}

const update = () => {
}

export default { getAll, create, deletePerson, update }
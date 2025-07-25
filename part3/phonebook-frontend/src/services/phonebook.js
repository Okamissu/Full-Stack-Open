import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const patchNumber = (id, number) => {
  const request = axios.patch(`${baseUrl}/${id}`, {
    number: number,
  })
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  remove,
  patchNumber,
}

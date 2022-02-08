import axios from 'axios'
const baseUrl = '/api/highscores'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

export default { 
  getAll: getAll, 
  create: create, 
}
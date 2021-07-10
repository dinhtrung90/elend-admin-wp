import axios from 'axios'
import { SERVICE_DOMAIN } from 'src/constants/constants'

const createEmployer = (employer) => {
  return axios.post(SERVICE_DOMAIN + '/api/employers/create', employer)
}

export const employerService = {
  createEmployer,
}

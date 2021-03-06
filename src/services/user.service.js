import axios from 'axios'
import { SERVICE_DOMAIN } from 'src/constants/constants'

const syncAccount = () => {
  return axios.get(SERVICE_DOMAIN + '/api/cms/users/sync')
}

const getAllUsers = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/cms/account/get`)
  }
  return axios.get(SERVICE_DOMAIN + `/api/cms/account/get?page=${data.page}&size=${data.size}`)
}

const createAccount = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/cms/account/create', data)
}

const updateAccount = (data) => {
  return axios.put(SERVICE_DOMAIN + '/api/cms/account/update', data)
}

const getUserById = (userId) => {
  return axios.get(SERVICE_DOMAIN + `/api/cms/account?userId=${userId}`)
}

const getUserAddressBooks = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/cms/account/${data.userId}/address`)
  }
  return axios.get(
    SERVICE_DOMAIN + `/api/cms/account/${data.userId}/address?page=${data.page}&size=${data.size}`,
  )
}

const getUserAddressBookById = (data) => {
  return axios.get(SERVICE_DOMAIN + `/api/cms/account/${data.userId}/address/get/${data.addressId}`)
}

const createUserAddressBook = (data) => {
  return axios.post(SERVICE_DOMAIN + `/api/cms/account/${data.userId}/address/create`, data)
}

const updateUserAddressBook = (data) => {
  return axios.put(SERVICE_DOMAIN + `/api/cms/account/${data.userId}/address/update`, data)
}

const deleteUserAddressBook = (data) => {
  return axios.delete(SERVICE_DOMAIN + `/api/cms/account/${data.userId}/address/delete/${data.id}`)
}

const uploadImage = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return axios.post(SERVICE_DOMAIN + `/api/public/eligibility/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const signupEligibility = (data) => {
  return axios.post(SERVICE_DOMAIN + `/api/public/eligibility/createAccount`, data)
}

const receivedPresent = (data) => {
  return axios.post(SERVICE_DOMAIN + `/api/public/eligibility/receivedPresent`, data)
}

const getAllPublishEligibility = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/public/eligibility/list`)
  }
  return axios.get(
    SERVICE_DOMAIN + `/api/public/eligibility/list?page=${data.page}&size=${data.size}`,
  )
}

const getPublishEligibilityDetail = (eligibityId) => {
  return axios.get(SERVICE_DOMAIN + `/api/public/eligibility/get/${eligibityId}`)
}

const getAllEligibility = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/cms/eligibility`)
  }
  return axios.get(SERVICE_DOMAIN + `/api/cms/eligibility?page=${data.page}&size=${data.size}`)
}

export const userService = {
  createAccount,
  updateAccount,
  getAllUsers,
  getUserById,
  createUserAddressBook,
  updateUserAddressBook,
  deleteUserAddressBook,
  getUserAddressBooks,
  getUserAddressBookById,
  syncAccount,
  uploadImage,
  signupEligibility,
  receivedPresent,
  getAllEligibility,
  getAllPublishEligibility,
  getPublishEligibilityDetail,
}

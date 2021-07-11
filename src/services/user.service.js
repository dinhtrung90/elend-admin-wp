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
  return axios.post(SERVICE_DOMAIN + '/api/cms/account/update', data)
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
  return axios.delete(
    SERVICE_DOMAIN + `/api/cms/account/${data.userId}/address/delete/${data.addressId}`,
  )
}

const getAllUserRoles = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/cms/role/get`)
  }
  return axios.get(SERVICE_DOMAIN + `/api/cms/role/get?page=${data.page}&size=${data.size}`)
}

const createUserRole = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/member-roles/create-roles', data)
}

const editUserRole = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/member-roles/edit', data)
}

const getUserRoleDetail = (roleName) => {
  return axios.get(SERVICE_DOMAIN + `/api/member-roles?roleName=${roleName}`)
}

const deleteUserRole = (roleName) => {
  return axios.delete(SERVICE_DOMAIN + `/api/member-roles/${roleName}`)
}

const getAllPermissions = () => {
  return axios.get(SERVICE_DOMAIN + '/api/permissions')
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
  getAllPermissions,
  getAllUserRoles,
  createUserRole,
  editUserRole,
  deleteUserRole,
  getUserRoleDetail,
  syncAccount,
}

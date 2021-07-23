import axios from 'axios'
import { SERVICE_DOMAIN } from 'src/constants/constants'

const getClientApplications = () => {
  return axios.get(SERVICE_DOMAIN + `/api/cms/client-app/get`)
}

const getAllPermissions = () => {
  return axios.get(SERVICE_DOMAIN + '/api/permissions')
}

const getAllRoles = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/cms/role/get`)
  }
  return axios.get(SERVICE_DOMAIN + `/api/cms/role/get?page=${data.page}&size=${data.size}`)
}

const createUserRole = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/cms/role/create', data)
}

const editUserRole = (data) => {
  return axios.put(SERVICE_DOMAIN + '/api/cms/role/update', data)
}

const getUserRoleDetail = (roleName) => {
  return axios.get(SERVICE_DOMAIN + `/api/cms/role/getBy?name=${roleName}`)
}

const deleteUserRole = (roleName) => {
  return axios.delete(SERVICE_DOMAIN + `/api/cms/role/delete/${roleName}`)
}

const createUserRoleMapping = (data) => {
  return axios.post(SERVICE_DOMAIN + `/api/cms/account/${data.userId}/role/mapping`, data)
}

export const permissionService = {
  getClientApplications,
  getAllPermissions,
  getAllRoles,
  createUserRole,
  editUserRole,
  deleteUserRole,
  getUserRoleDetail,
  createUserRoleMapping,
}

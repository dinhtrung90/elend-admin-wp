import axios from 'axios'
import { SERVICE_DOMAIN } from 'src/constants/constants'

const getClientApplications = () => {
  return axios.get(SERVICE_DOMAIN + `/api/cms/client-app/get`)
}

const getAllPermissions = () => {
  return axios.get(SERVICE_DOMAIN + '/api/permissions')
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

export const permissionService = {
  getClientApplications,
  getAllPermissions,
  getAllUserRoles,
  createUserRole,
  editUserRole,
  deleteUserRole,
  getUserRoleDetail,
}

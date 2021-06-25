import axios from 'axios';
import { SERVICE_DOMAIN } from 'src/constants/constants';

const syncAccount = () => {
  return axios.get(SERVICE_DOMAIN + '/api/cms/users/sync');
};

const getAllUsers = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/cms/account/get`);
  }
  return axios.get(SERVICE_DOMAIN + `/api/cms/account/get?page=${data.page}&size=${data.size}`);
};

const createAccount = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/cms/account/create', data);
};

const getUserById = (userId) => {
  return axios.get(SERVICE_DOMAIN + `/api/cms/account?userId=${userId}`);
};

const getAllUserRoles = (data) => {
  if (data && data.all) {
    return axios.get(SERVICE_DOMAIN + `/api/cms/role/get`);
  }
  return axios.get(SERVICE_DOMAIN + `/api/cms/role/get?page=${data.page}&size=${data.size}`);
}

const createUserRole = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/member-roles/create-roles', data);
}

const editUserRole = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/member-roles/edit', data);
}

const getUserRoleDetail = (roleName) => {
  return axios.get(SERVICE_DOMAIN + `/api/member-roles?roleName=${roleName}`);
}

const deleteUserRole = (roleName) => {
  return axios.delete(SERVICE_DOMAIN + `/api/member-roles/${roleName}`);
}

const getAllPermissions = () => {
  return axios.get(SERVICE_DOMAIN + '/api/permissions');
}

export const userService = {
  createAccount,
  getAllUsers,
  getUserById,
  getAllPermissions,
  getAllUserRoles,
  createUserRole,
  editUserRole,
  deleteUserRole,
  getUserRoleDetail,
  syncAccount,
};

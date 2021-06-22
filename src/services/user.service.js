import axios from 'axios';
import { SERVICE_DOMAIN } from 'src/constants/constants';

const syncAccount = () => {
  return axios.post(SERVICE_DOMAIN + '/api/users/sync');
};

const getAllUsers = (data) => {
  if (data && data.all) {
    return axios.get(`/api/cms/users/get`);
  }
  return axios.get(`/api/cms/users/get?page=${data.page}&size=${data.size}`);
};

const createAccount = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/cms/account/create', data);
}

const getAllUserRoles = (data) => {
  if (data && data.all) {
    return axios.post(`/api/roles`);
  }
  return axios.post(`/api/roles?page=${data.page}&size=${data.size}`);
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
  getAllPermissions,
  getAllUserRoles,
  createUserRole,
  editUserRole,
  deleteUserRole,
  getUserRoleDetail,
  syncAccount,
};

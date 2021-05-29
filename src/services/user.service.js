import axios from 'axios';
import { SERVICE_DOMAIN } from 'src/constants/constants';

const syncAccount = () => {
  return axios.post(SERVICE_DOMAIN + '/api/users/sync');
};

const getAllUserRoles = (data) => {
  return axios.get(SERVICE_DOMAIN + `/api/member-roles/get-roles?page=${data.page}&size=${data.size}`);
}

const createUserRole = (data) => {
  return axios.post(SERVICE_DOMAIN + '/api/member-roles/create-roles', data);
}

const getUserRoleDetail = (roleName) => {
  return axios.get(SERVICE_DOMAIN + `/api/member-roles?roleName=${roleName}`);
}

const getAllPermissions = () => {
  return axios.get(SERVICE_DOMAIN + '/api/permissions');
}

export const userService = {
  getAllPermissions,
  getAllUserRoles,
  createUserRole,
  getUserRoleDetail,
  syncAccount,
};

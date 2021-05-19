import axios from 'axios';
import { SERVICE_DOMAIN } from 'src/constants/constants';

const syncAccount = () => {
  return axios.post(SERVICE_DOMAIN + '/api/users/sync');
};

const getAllUserRoles = () => {
  return axios.get(SERVICE_DOMAIN + '/api/member-roles/get-roles');
}

const getAllPermissions = () => {
  return axios.get(SERVICE_DOMAIN + '/api/permissions');
}

export const userService = {
  getAllPermissions,
  getAllUserRoles,
  syncAccount,
};
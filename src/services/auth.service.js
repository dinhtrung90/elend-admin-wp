import axios from 'axios';
import {BASE_URL } from 'src/constants/constants';
import { SERVICE_DOMAIN } from 'src/constants/constants';

const authCMS = (data) => {
  return axios.post(BASE_URL + '/api/cms/auth', data);
};

const login = (data) => {
  return axios.post(BASE_URL + '/api/auth', data);
};

const resetPasswordEmail = (userId) => {
  return axios.post(SERVICE_DOMAIN + `/api/cms/account/${userId}/reset-password-email`);
};

const resendVerifyEmail = (userId) => {
  return axios.post(SERVICE_DOMAIN + `/api/cms/account/${userId}/resend-verify-email`);
};

export const authService = {
  login,
  authCMS,
  resetPasswordEmail,
  resendVerifyEmail
}
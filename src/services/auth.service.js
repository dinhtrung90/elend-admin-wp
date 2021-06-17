import axios from 'axios';
import {BASE_URL } from 'src/constants/constants';

const authCMS = (data) => {
  return axios.post(BASE_URL + '/api/cms/auth', data);
};

const login = (data) => {
  return axios.post(BASE_URL + '/api/auth', data);
};

export const authService = {
  login,
  authCMS
}
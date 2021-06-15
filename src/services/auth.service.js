import axios from 'axios';
import {BASE_URL } from 'src/constants/constants';

const login = (data) => {
  return axios.post(BASE_URL + '/api/auth', data);
};

export const authService = {
  login
}
import axios from 'axios';
import token from '../utils/token';

const userToken = token.getToken();

export const authInstance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop/auth/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoInstance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop/todos`,
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

authInstance.interceptors.response.use((res) => token.setToken(res.data.access_token));

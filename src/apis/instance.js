import axios from 'axios';
import token from '../utils/token';

export const authInstance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop/auth/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoInstance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop/todos`,
});

authInstance.interceptors.response.use(
  (res) => token.setToken(res.data.access_token),
  (err) => {
    let errorMessage;
    switch (err.response.data.message) {
      case 'Unauthorized':
        errorMessage = '비밀번호를 확인해주세요!';
        break;
      default:
        errorMessage = err.response.data.message;
    }
    return Promise.reject(errorMessage);
  }
);

todoInstance.interceptors.request.use((config) => {
  if (!config.headers) {
    return config;
  }

  const bearerToken = `Bearer ${token.getToken()}`;
  config.headers.Authorization ??= bearerToken;

  return config;
});

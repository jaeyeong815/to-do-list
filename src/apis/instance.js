import axios from 'axios';
import token from '../utils/token';

export const authInstance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop/auth/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.response.use((res) => token.setToken(res.data.access_token));

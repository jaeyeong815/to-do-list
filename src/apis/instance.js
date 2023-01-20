import axios from 'axios';

export const authInstance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop/auth/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

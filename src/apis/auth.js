import { authInstance } from './instance';

const authApi = {
  signup: (userData) => authInstance.post('signup', userData),
  login: (userData) => authInstance.post('signin', userData),
};

export default authApi;

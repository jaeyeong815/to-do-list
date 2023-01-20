import { authInstance } from './instance';
import token from '../utils/token';

const authApi = {
  signup: (userData) =>
    authInstance.post('signup', userData).then((res) => token.setToken(res.data.access_token)),
  login: (userData) =>
    authInstance.post('signin', userData).then((res) => token.setToken(res.data.access_token)),
};

export default authApi;

const token = {
  setToken: (userToken) => localStorage.setItem('token', userToken),
  getToken: () => localStorage.getItem('token'),
  delToken: () => localStorage.removeItem('token'),
};

export default token;

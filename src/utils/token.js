const token = {
  setToken: (userToken) => localStorage.setItem('token', userToken),
  getToken: () => localStorage.getItem('token'),
};

export default token;

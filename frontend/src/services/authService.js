import api from './api';

export const getToken = () => {
  return localStorage.getItem('token');
};


export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  const { token, user } = res.data;

  // ✅ Store token for future requests
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return { token, ...user };
};

export const registerUser = async (data) => {
  const res = await api.post('/auth/register', data);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

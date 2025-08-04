import axios from 'axios';

const AUTH_API = 'https://localhost:7065/api/auth';

export const login = async (username, password) => {
  const { data } = await axios.post(`${AUTH_API}/login`, { username, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const refreshToken = async () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const { data } = await axios.post(`${AUTH_API}/refresh`, { token, refreshToken });
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
};
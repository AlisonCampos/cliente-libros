import axios from 'axios';

const AUTH_API = 'https://microservicio-libro.onrender.com/api/Auth';

export const login = async (username, password) => {
  const { data } = await axios.post(`${AUTH_API}/login`, { username, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const refreshToken = async () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const requestBody = { token, refreshToken };
  console.log('Enviando refresh token con JSON:', JSON.stringify(requestBody, null, 2));

  try {
    const { data } = await axios.post(`${AUTH_API}/refresh`, requestBody);
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.token;
  } catch (error) {
    console.log('Error al renovar token:', error.response ? error.response.data : error.message);
    throw error;
  }
};
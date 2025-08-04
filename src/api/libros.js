import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7065/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const obtenerLibros = () => API.get('/libromaterial');
export const crearLibro = (data) => API.post('/libromaterial', data);
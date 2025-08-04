import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7069/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const obtenerAutores = () => API.get('/autor');
export const obtenerAutorPorId = (id) => API.get(`/autor/${id}`);
export const obtenerAutorPorNombre = (nombre) => API.get(`/autor/nombre?nombre=${nombre}`);
export const crearAutor = (data) => API.post('/autor', data);
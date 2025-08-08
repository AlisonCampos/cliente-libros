import axios from 'axios';

const API = axios.create({
  baseURL: 'https://microservicio-libro.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
API.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      alert('Tu sesión ha expirado. Se intentará renovar el token...');
      try {
        await import('./auth').then(({ refreshToken }) => refreshToken());
        return API.request(error.config);
      } catch {
        alert('No se pudo renovar el token. Por favor, inicia sesión nuevamente.');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);
export const obtenerLibros = () => API.get('/libromaterial');
export const crearLibro = (data) => API.post('/libromaterial', data);
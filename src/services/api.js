import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7291/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  return await api.post('/auth/login', credentials)
};

export const signup = (data) => api.post('/auth/signup', data);

export const getCustomers = () => api.get('/customers');

export const getMatters = (customerId) => api.get(`/customers/${customerId}/matters`);

import axios from 'axios';

const BASE_URL = 'https://rastro-backend-4a9us.ondigitalocean.app/api';




const api = axios.create({
  baseURL: BASE_URL,
});


api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

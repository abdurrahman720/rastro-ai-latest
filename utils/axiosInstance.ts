
import axios from 'axios';

const BASE_URL = 'https://rastro-backend-4a9us.ondigitalocean.app/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;


import axios from 'axios';

const BASE_URL = 'https://sourcerer-production.up.railway.app/api';

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

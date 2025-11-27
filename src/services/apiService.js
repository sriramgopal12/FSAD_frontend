import axios from 'axios';
import { BASE_URL } from '../config/api.js';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - runs before every request
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response received from: ${response.config.url}`);
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response?.status === 401) {
      console.error('Unauthorized access - redirecting to login');
      // You can add automatic logout logic here
      // localStorage.removeItem('authToken');
      // window.location.href = '/login';
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Generic HTTP methods
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data = {}, config = {}) => apiClient.post(url, data, config),
  put: (url, data = {}, config = {}) => apiClient.put(url, data, config),
  patch: (url, data = {}, config = {}) => apiClient.patch(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),

  // Authentication specific methods
  auth: {
    login: (credentials) => apiClient.post('/check', credentials),
    register: (userData) => apiClient.post('/register', userData),
    logout: () => {
      // Clear local storage and perform logout
      localStorage.removeItem('un');
      localStorage.removeItem('role');
      // You can add additional cleanup here
    },
  },

  // User management methods (add as needed)
  users: {
    getProfile: (userId) => apiClient.get(`/users/${userId}`),
    updateProfile: (userId, data) => apiClient.put(`/users/${userId}`, data),
    getAllUsers: () => apiClient.get('/users'),
  },

  // Course management methods (add as needed)
  courses: {
    getAll: () => apiClient.get('/courses'),
    getById: (courseId) => apiClient.get(`/courses/${courseId}`),
    create: (courseData) => apiClient.post('/courses', courseData),
    update: (courseId, courseData) => apiClient.put(`/courses/${courseId}`, courseData),
    delete: (courseId) => apiClient.delete(`/courses/${courseId}`),
  },

  // Add more service methods as your application grows
};

// Export the configured axios instance for custom usage
export default apiClient;
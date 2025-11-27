// API Configuration
// The base URL is now managed through environment variables
// To change the backend URL, modify the .env file in the project root

const API_CONFIG = {
  // Base URL from environment variables with fallback
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
  
  // Other configuration options
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  ENVIRONMENT: import.meta.env.VITE_APP_ENV || import.meta.env.MODE || 'development',
  
  // Feature flags
  ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
};

// Export the base URL
export const BASE_URL = API_CONFIG.BASE_URL;

// Export API endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  LOGIN: '/check',
  REGISTER: '/register',
  
  // Add other endpoints here as your application grows
  USERS: '/users',
  COURSES: '/courses',
  PROFILE: '/profile',
  // Example: DASHBOARD: '/dashboard',
  // Example: UPLOAD: '/upload',
};

// Export the full API configuration
export default API_CONFIG;
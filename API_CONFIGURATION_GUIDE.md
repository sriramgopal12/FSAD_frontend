# Global API URL Configuration Guide

This project now includes a centralized API URL configuration system that allows you to manage backend URLs from a single location.

## Quick Start

### Changing the Backend URL

1. **Simple Method**: Edit the `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://your-backend-url:port
   ```

2. **Advanced Method**: Use different environment files for different environments.

## File Structure

```
src/
├── config/
│   └── api.js              # API configuration and endpoints
├── services/
│   └── apiService.js       # Centralized API service with axios
└── components/
    ├── Login.jsx           # Updated to use apiService
    └── Register.jsx        # Updated to use apiService
```

## Configuration Files

### 1. Environment Variables (`.env`)
```env
# Main API URL - Change this to your backend URL
VITE_API_BASE_URL=http://localhost:8081

# Optional configurations
VITE_API_TIMEOUT=10000
VITE_APP_ENV=development
VITE_ENABLE_LOGGING=true
```

### 2. API Configuration (`src/config/api.js`)
- Manages environment-based URL switching
- Defines all API endpoints in one place
- Exports constants for use throughout the app

### 3. API Service (`src/services/apiService.js`)
- Centralized HTTP client using axios
- Includes request/response interceptors
- Pre-configured methods for common API operations

## Usage Examples

### Basic API Calls
```javascript
import { apiService } from '../services/apiService.js';

// Login
const loginUser = async (credentials) => {
  try {
    const response = await apiService.auth.login(credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const registerUser = async (userData) => {
  try {
    const response = await apiService.auth.register(userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### Adding New API Endpoints
1. Add the endpoint to `src/config/api.js`:
```javascript
export const API_ENDPOINTS = {
  LOGIN: '/check',
  REGISTER: '/register',
  COURSES: '/courses',          // Add new endpoint
  USER_PROFILE: '/profile',     // Add new endpoint
};
```

2. Add the service method to `src/services/apiService.js`:
```javascript
export const apiService = {
  // ... existing methods
  
  courses: {
    getAll: () => apiClient.get('/courses'),
    create: (courseData) => apiClient.post('/courses', courseData),
  },
};
```

3. Use in your components:
```javascript
import { apiService } from '../services/apiService.js';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    apiService.courses.getAll()
      .then(response => setCourses(response.data))
      .catch(error => console.error('Failed to fetch courses:', error));
  }, []);
};
```

## Environment Management

### Development Environment
Use `.env.development`:
```env
VITE_API_BASE_URL=http://localhost:8081
VITE_ENABLE_DEBUG=true
```

### Production Environment
Use `.env.production`:
```env
VITE_API_BASE_URL=https://your-production-api.com
VITE_ENABLE_DEBUG=false
```

### Staging Environment
Create `.env.staging`:
```env
VITE_API_BASE_URL=https://your-staging-api.com
VITE_ENABLE_DEBUG=true
```

## Features

### 1. Centralized Configuration
- All API URLs managed from one location
- Environment-based URL switching
- Easy deployment configuration

### 2. Request/Response Interceptors
- Automatic request logging
- Global error handling
- Authentication token management (ready to implement)

### 3. Pre-configured Methods
- Authentication methods (`login`, `register`, `logout`)
- User management methods
- Course management methods (extensible)

### 4. Error Handling
- Automatic timeout handling
- HTTP status code handling
- Network error management

## Deployment

### For Production Deployment:
1. Update `.env.production` with your production API URL
2. Build the project: `npm run build`
3. The build process will automatically use production environment variables

### For Different Environments:
```bash
# Development (default)
npm run dev

# Production build
npm run build

# Custom environment
VITE_API_BASE_URL=https://custom-api.com npm run dev
```

## Security Notes

- Never commit sensitive API keys to version control
- Use different `.env` files for different environments
- Consider using HTTPS in production
- Implement proper authentication token management

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **Environment Variables Not Loading**: Make sure variable names start with `VITE_`
3. **Network Errors**: Check if the backend server is running and accessible

### Debug Mode:
Set `VITE_ENABLE_DEBUG=true` in your `.env` file to enable detailed logging.

## Next Steps

1. Add authentication token management
2. Implement request retry logic
3. Add request/response caching
4. Create custom hooks for API calls
5. Add TypeScript definitions for better type safety

This configuration provides a solid foundation for managing API URLs and can be easily extended as your application grows.
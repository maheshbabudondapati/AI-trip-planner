import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5051', // Base URL for all requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true, // Important for CORS
  timeout: 10000
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error);

    if (!error.response) {
      // Network error
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Handle specific error cases
    switch (error.response.status) {
      case 401:
        // Clear auth data and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Authentication failed. Please sign in again.');
      
      case 403:
        throw new Error('You do not have permission to perform this action.');
      
      case 404:
        throw new Error('The requested resource was not found.');
      
      case 422:
        const errors = error.response.data.errors;
        if (errors) {
          const errorMessage = Object.entries(errors)
            .map(([key, value]) => `${key} ${value.join(', ')}`)
            .join('; ');
          throw new Error(errorMessage);
        }
        throw new Error('Invalid data provided. Please check your input.');
      
      default:
        throw new Error(error.response.data.message || 'An error occurred. Please try again.');
    }
  }
);

export default axiosInstance;
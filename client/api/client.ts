import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This ensures cookies (including bearer tokens) are sent
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add any additional headers if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add additional request processing here if needed
    // For example, adding custom headers, logging, etc.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common response patterns
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can add global response processing here
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.warn('Unauthorized access - consider redirecting to login');
    }
    return Promise.reject(error);
  }
);

export { apiClient };
export type { AxiosResponse };

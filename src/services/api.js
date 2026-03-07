import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with default config
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sifc-api.mypaaltu.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Show error toast for non-401 errors
    if (error.response?.status !== 401) {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
};

// User API functions
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getAllUsers: () => api.get('/users'),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getUserById: (id) => api.get(`/users/${id}`),
};

// DSR (Daily Sales Report) API functions
export const dsrAPI = {
  getDSRs: (params = {}) => api.get('/dsr', { params }),
  createDSR: (dsrData) => api.post('/dsr', dsrData),
  updateDSR: (id, dsrData) => api.put(`/dsr/${id}`, dsrData),
  deleteDSR: (id) => api.delete(`/dsr/${id}`),
  getDSRById: (id) => api.get(`/dsr/${id}`),
  getDSRStats: (params = {}) => api.get('/dsr/stats', { params }),
};

// Attendance API functions
export const attendanceAPI = {
  getAttendance: (params = {}) => api.get('/attendance', { params }),
  checkIn: (data) => api.post('/attendance/check-in', data),
  checkOut: (data) => api.post('/attendance/check-out', data),
  getAttendanceStats: (params = {}) => api.get('/attendance/stats', { params }),
  updateAttendance: (id, data) => api.put(`/attendance/${id}`, data),
};

// Reports API functions
export const reportsAPI = {
  getDashboardStats: (params = {}) => api.get('/reports/dashboard', { params }),
  getSalesReport: (params = {}) => api.get('/reports/sales', { params }),
  getAttendanceReport: (params = {}) => api.get('/reports/attendance', { params }),
  getUserPerformance: (params = {}) => api.get('/reports/performance', { params }),
  exportReport: (type, params = {}) => api.get(`/reports/export/${type}`, { 
    params,
    responseType: 'blob'
  }),
};

// Geo-tagging API functions
export const geoAPI = {
  getLocations: (params = {}) => api.get('/geo-tagging', { params }),
  addLocation: (data) => api.post('/geo-tagging', data),
  updateLocation: (id, data) => api.put(`/geo-tagging/${id}`, data),
  deleteLocation: (id) => api.delete(`/geo-tagging/${id}`),
};

// Call logs API functions
export const callLogsAPI = {
  getCallLogs: (params = {}) => api.get('/call-logs', { params }),
  createCallLog: (data) => api.post('/call-logs', data),
  updateCallLog: (id, data) => api.put(`/call-logs/${id}`, data),
  deleteCallLog: (id) => api.delete(`/call-logs/${id}`),
};

export default api;
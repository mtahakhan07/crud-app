import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

// Global axios interceptor to handle unauthorized responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login if token expires
      localStorage.removeItem('token');
      window.location.href = '/'; // or wherever your login page is
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);



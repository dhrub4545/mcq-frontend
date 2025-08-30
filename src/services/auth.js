// src/services/auth.js

// API URL configuration for environment support
const getApiUrl = () => {
  // For Next.js use NEXT_PUBLIC_API_URL, for React use REACT_APP_API_URL
  return process.env.NEXT_PUBLIC_API_URL || 
         process.env.REACT_APP_API_URL || 
         'http://localhost:5000'; // Fallback for local development
};

// In your auth service file
const API_BASE_URL = getApiUrl();
console.log('API_BASE_URL:', API_BASE_URL); // Should show your Vercel URL, not localhost


export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    return data.user; // Return user object with token
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    return data.user; // Return user object with token
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('quizUser') || '{}');
  return {
    'Authorization': `Bearer ${user.token}`,
    'Content-Type': 'application/json',
  };
};

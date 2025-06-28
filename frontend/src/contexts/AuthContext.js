// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { logoutUser } from '../services/authService';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // must include name, email, role in payload
        setAuthData(decoded);
      } catch (err) {
        console.error('⚠️ Invalid token:', err);
        setAuthData(null);
      }
    }
  }, []);

  const logout = () => {
    setAuthData(null);
    logoutUser();
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

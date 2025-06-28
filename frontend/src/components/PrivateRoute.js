import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { authData } = useAuth();

  if (!authData) return <Navigate to="/login" />;

  if (role && authData.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

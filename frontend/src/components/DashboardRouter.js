// src/components/DashboardRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import LandingPage from '../pages/LandingPage';
import AdminDashboard from '../pages/AdminDashboard';
import AgentDashboard from '../pages/AgentDashboard';
import UserDashboard from '../pages/UserDashboard';
import PrivateRoute from './PrivateRoute';

const DashboardRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      path="/admin"
      element={
        <PrivateRoute roles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/agent"
      element={
        <PrivateRoute roles={['agent']}>
          <AgentDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/user"
      element={
        <PrivateRoute roles={['user']}>
          <UserDashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default DashboardRouter;

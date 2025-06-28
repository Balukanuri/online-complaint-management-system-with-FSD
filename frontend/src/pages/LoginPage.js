import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaUserShield, FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import '../styles/main.css';

const LoginPage = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setIsLoading(false);
      return setError('Please enter a valid email address');
    }

    try {
      const userData = await loginUser(form);
      setAuthData(userData);
      navigate(`/${userData.role.toLowerCase()}-dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="auth-logo">
            <FaUserShield />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Please enter your credentials to login</p>
        </div>

        {error && (
          <motion.div 
            className="auth-message error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
  <div className="input-group">
    <div className="input-wrapper">
      <FaEnvelope className="input-icon" />
      <input
        type="email"
        id="email"
        name="email"
        className="input-field"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
        autoFocus
      />
    </div>
  </div>

  <div className="input-group">
    <div className="input-wrapper">
      <FaLock className="input-icon" />
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        className="input-field"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button 
        type="button" 
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
          <div className="auth-options">
            <label className="checkbox-group">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="checkbox-input"
                checked={form.remember}
                onChange={handleChange}
              />
              <span className="checkbox-label">Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-spinner"></span>
            ) : (
              'Login'
            )}
          </button>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
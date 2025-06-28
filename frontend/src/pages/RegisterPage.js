import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaUserTie, FaUserShield, FaUserCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/main.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'user' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ 
      ...form, 
      [name]: value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await registerUser(form);
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'user', label: 'Regular User', icon: <FaUser /> },
    { value: 'professional', label: 'Professional', icon: <FaUserTie /> },
    { value: 'admin', label: 'Administrator', icon: <FaUserCog /> }
  ];

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
            <FaUserShield size={28} />
          </div>
          <h1 className="auth-title">Join Us Today</h1>
          <p className="auth-subtitle">Get started in just a few minutes</p>
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
          {/* Name Field */}
          <div className="input-group">
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Email Field */}
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
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="input-group">
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="input-field"
                placeholder="Password (At least 8 characters)"
                value={form.password}
                onChange={handleChange}
                required
                minLength="8"
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

          {/* Role Selection */}
          <div className="input-group">
            <p className="role-selection-label">Select Your Role</p>
            <div className="role-options">
              {roleOptions.map((option) => (
                <label 
                  key={option.value}
                  className={`role-option ${form.role === option.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={form.role === option.value}
                    onChange={handleChange}
                    className="role-radio"
                  />
                  <div className="role-content">
                    <span className="role-icon">{option.icon}</span>
                    <span className="role-label">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-spinner"></span>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
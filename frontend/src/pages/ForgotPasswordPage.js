// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🔐 Reset instructions sent to ${email} (not actually sent).`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔑 Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

import React, { useState } from 'react';
import '../styles/Auth.css';
import image from '../images/a.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert(`Password reset link has been sent to ${email}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>

        <div className="redirect-link">
          <p>Remember your password? <a href="/">Login</a></p>
        </div>
      </div>
      <div className="auth-image">
        <img src={image} alt="Welcome to the app" />
      </div>
    </div>
  );
};

export default ForgotPassword;

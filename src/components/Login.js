import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; 
import image from '../images/a.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email or Username</label>
          <input
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="auth-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/">Forgot password?</a>
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <div className="redirect-link">
          <p>New on our platform? <a href="/register">Create an account</a></p>
        </div>
      </div>
      <div className="auth-image">
      <img src={image} alt="Welcome to the app" />
      </div>
    </div>
  );
};

export default Login;

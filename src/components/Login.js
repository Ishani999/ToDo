import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css'; 
import image from '../images/a.jpg'; 

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

   // Validates if the email is correct
   const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email); 

   const handleLogin = (e) => {
     e.preventDefault();
     setErrorMessage(''); // Clear the error message before submitting
 
     // Validation
     if (!isValidEmail(email)) {
       setErrorMessage('Please enter a valid email');
       return;
     }
 
     if (password.length < 6) {
       setErrorMessage('Password must be at least 6 characters');
       return;
     }
 
     setLoading(true); // Set loading to true when logging in
 
     // Simulate login (no backend)
     setTimeout(() => {
       setLoading(false); // Stop the loading spinner after the "API call"
       login(email, password); // Call the login function from AuthContext
     }, 1500);
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

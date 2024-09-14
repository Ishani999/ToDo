// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulate login logic (could be extended with validation)
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      
      const loggedInUser = await new Promise((resolve) =>
        setTimeout(() => resolve({ name: 'John Doe' }), 1000)
      );
      setUser(loggedInUser);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

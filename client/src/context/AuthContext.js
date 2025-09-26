import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Hardcoded admin credentials
    if (email === 'admin@edutrack.com' && password === 'admin123') {
      const user = {
        email: email,
        name: 'Admin User',
        role: 'admin'
      };
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    } else {
      return { 
        success: false, 
        message: 'Invalid email or password' 
      };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
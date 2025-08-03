import React, { createContext, useState, useEffect } from 'react';
import { userProfile } from '@/data/user';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('curo24_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('curo24_user');
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const fullUserProfile = { ...userProfile, ...userData };
    localStorage.setItem('curo24_user', JSON.stringify(fullUserProfile));
    setUser(fullUserProfile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('curo24_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
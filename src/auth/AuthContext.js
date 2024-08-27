import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    console.log("useEffect executed");
    const user = localStorage.getItem("user");
    console.log("User from localStorage:", user);
    if (user) {
      setIsAuthenticated(true);
      console.log("User is authenticated");
    } else {
      console.log("User is not authenticated");
    }
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
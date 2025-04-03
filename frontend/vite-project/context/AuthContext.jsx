import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Set default auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verify token and get user data
          const res = await axios.get("http://localhost:5000/api/auth/me");
          setUser(res.data);
        } catch (err) {
          // If token is invalid, clear it
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
      }

      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login user
  const login = (userData) => {
    setUser(userData);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

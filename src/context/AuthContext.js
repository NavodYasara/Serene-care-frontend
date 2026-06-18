import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and exposes auth state globally.
 * Persists userProfile + userType to localStorage so refreshes keep the session.
 */
export const AuthProvider = ({ children }) => {
  const [userProfile, setuserProfile] = useState(null);
  const [userType, setUserType]       = useState(null);
  const [authToken, setAuthToken]     = useState(null);
  const [loading, setLoading]         = useState(true); // prevents flicker on refresh

  // Hydrate from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    const token = localStorage.getItem("authToken");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setuserProfile(parsed);
        setUserType(parsed.userType || null);
        if (token) {
          setAuthToken(token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch {
        localStorage.removeItem("userProfile");
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  /**
   * Call this after a successful login API response.
   * @param {object} details  — full user object returned by the server
   * @param {string} role     — "admin" | "caretaker" | "caregiver" | "manager"
   */
  const login = (details, role, token) => {
    const payload = { ...details, userType: role };
    localStorage.setItem("userProfile", JSON.stringify(payload));
    if (token) localStorage.setItem("authToken", token);
    
    setuserProfile(payload);
    setUserType(role);
    if (token) {
      setAuthToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  const logout = () => {
    localStorage.clear();
    setuserProfile(null);
    setUserType(null);
    setAuthToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = !!userType;

  return (
    <AuthContext.Provider
      value={{ userProfile, userType, authToken, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/** Convenience hook */
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

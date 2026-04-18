import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and exposes auth state globally.
 * Persists userDetails + userType to localStorage so refreshes keep the session.
 */
export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userType, setUserType]       = useState(null);
  const [loading, setLoading]         = useState(true); // prevents flicker on refresh

  // Hydrate from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("userDetails");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserDetails(parsed);
        setUserType(parsed.userType || null);
      } catch {
        localStorage.removeItem("userDetails");
      }
    }
    setLoading(false);
  }, []);

  /**
   * Call this after a successful login API response.
   * @param {object} details  — full user object returned by the server
   * @param {string} role     — "admin" | "caretaker" | "caregiver" | "manager"
   */
  const login = (details, role) => {
    const payload = { ...details, userType: role };
    localStorage.setItem("userDetails", JSON.stringify(payload));
    setUserDetails(payload);
    setUserType(role);
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    setUserDetails(null);
    setUserType(null);
  };

  const isAuthenticated = !!userType;

  return (
    <AuthContext.Provider
      value={{ userDetails, userType, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/** Convenience hook */
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

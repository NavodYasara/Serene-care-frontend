import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  userProfile: any;
  userType: string | null;
  authToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (details: any, role: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider — wraps the app and exposes auth state globally.
 * Persists userProfile + userType to localStorage so refreshes keep the session.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setuserProfile] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // prevents flicker on refresh

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
   * @param details  — full user object returned by the server
   * @param role     — "admin" | "caretaker" | "caregiver" | "manager"
   */
  const login = (details: any, role: string, token: string) => {
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
      value={{
        userProfile,
        userType,
        authToken,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/** Convenience hook */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

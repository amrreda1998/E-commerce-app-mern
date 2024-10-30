// AuthProvider.tsx
import React, { useState } from "react";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"))
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const setAuthData = (userEmail: string, userToken: string) => {
    setEmail(userEmail);
    setToken(userToken);
    // Optionally, store these in localStorage for persistence
    localStorage.setItem("email", userEmail);
    localStorage.setItem("token", userToken);
  };

  const clearAuthData = () => {
    setEmail(null);
    setToken(null);
    // Clear from localStorage as well
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const value = {
    email,
    token,
    setAuthData,
    clearAuthData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// AuthContext.ts
import { createContext, useContext } from "react";

interface AuthContextType {
  email: string | null;
  token: string | null;
  setAuthData: (email: string, token: string) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

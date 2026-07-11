import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
const [token, setToken] = useState<string | null>(null);
const [loading, setLoading] = useState(true);

  function login(newToken: string) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

 useEffect(() => {
    async function validateSession() {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        setToken(storedToken);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    validateSession();
  }, [logout]);

  if (loading) {
  return null;
}

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
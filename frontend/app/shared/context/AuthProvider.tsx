import { createContext, useEffect, useState } from 'react';
import { connectSocket, socket } from '~/config/socket/socket';

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

 useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) return;

  setToken(storedToken);
  connectSocket();
}, []);

  function login(newToken: string) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function logout() {
    socket.disconnect();
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
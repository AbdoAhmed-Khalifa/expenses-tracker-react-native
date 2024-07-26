import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  async function authenticate(token) {
    setAuthToken(token);
    await AsyncStorage.setItem('token', token);
  }

  async function logout() {
    setAuthToken(null);
    await AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  if (!AuthContext) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return useContext(AuthContext);
}

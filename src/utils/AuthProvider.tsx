// src/utils/AuthProvider.tsx
import React, { createContext, useState, useMemo, useContext } from 'react';
// Mungkin perlu impor tipe lain

// Definisikan tipe untuk context value Anda
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (newToken: string) => void;
  logout: () => void;
  // tambahkan properti/fungsi lain yang relevan
}

// Buat context dan EKSPOR context tersebut
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Definisikan komponen AuthProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem('authToken');
    console.log("Initial token from localStorage:", savedToken); // Debug log
    return savedToken;
  });

  // Fungsi login, logout, dll.
  const login = (newToken: string) => {
    console.log("Setting new token:", newToken); // Debug log
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    console.log("Logging out, removing token"); // Debug log
    setToken(null);
    localStorage.removeItem('authToken');
  };

  // Gunakan useMemo agar value context tidak berubah referensinya setiap render
  const contextValue = useMemo(() => ({
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }), [token]); // Sertakan dependensi yang relevan

  console.log("AuthProvider state:", { token, isAuthenticated: !!token }); // Debug log

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// JANGAN ekspor useAuth dari sini lagi
// export default AuthProvider; // Atau gunakan named export jika preferensi Anda begitu
// src/utils/AuthProvider.tsx
import React, { createContext, useState, useMemo /*, useEffect, dll */ } from 'react';
// Mungkin perlu impor tipe lain

// Definisikan tipe untuk context value Anda
interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  // tambahkan properti/fungsi lain yang relevan
}

// Buat context dan EKSPOR context tersebut
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definisikan komponen AuthProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken')); // Contoh inisialisasi

  // Fungsi login, logout, dll.
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken); // Contoh simpan ke local storage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Contoh hapus dari local storage
  };

  // Gunakan useMemo agar value context tidak berubah referensinya setiap render
  const contextValue = useMemo(() => ({
    token,
    login,
    logout,
  }), [token]); // Sertakan dependensi yang relevan

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// JANGAN ekspor useAuth dari sini lagi
// export default AuthProvider; // Atau gunakan named export jika preferensi Anda begitu
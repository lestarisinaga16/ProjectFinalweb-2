// src/App.tsx (Contoh dengan BrowserRouter di sini)
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Pastikan BrowserRouter diimpor
import { AuthProvider } from './utils/AuthProvider';
// ... import komponen halaman lainnya ...
import Home from './pages/Home';
import MenuMakanan from './pages/Menu';
import Pemesanan from './pages/Pesan';
import Deliveries from './pages/Deliveries';
import Testimoni from './pages/Testimonies';
import Profile from './pages/Profile';
// ... dst ...

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter> {/* <-- BrowserRouter membungkus Routes */}
        <Routes>
          {/* ... definisi <Route> Anda ... */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuMakanan />} />
          <Route path="/pesan" element={<Pemesanan />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/testimonies" element={<Testimoni />} />
          <Route path="/profile" element={<Profile />} />
          {/* ... dst ... */}
           <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter> {/* <-- Tutup BrowserRouter */}
    </AuthProvider>
  );
};

export default App;
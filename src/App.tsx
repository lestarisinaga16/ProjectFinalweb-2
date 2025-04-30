// src/App.tsx (Contoh dengan BrowserRouter di sini)
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthProvider';
// ... import komponen halaman lainnya ...
import Home from './pages/Home';
import MenuMakanan from './pages/Menu';
import Pemesanan from './pages/Pesan';
import Deliveries from './pages/Deliveries';
import Testimoni from './pages/Testimonies';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
// ... dst ...

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute check:", { isAuthenticated, path: location.pathname }); // Debug log

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login"); // Debug log
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirects to home if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  console.log("PublicRoute check:", { isAuthenticated }); // Debug log

  if (isAuthenticated) {
    console.log("Already authenticated, redirecting to home"); // Debug log
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Initial route redirects to home if authenticated, register if not */}
          <Route path="/" element={
            <Navigate to="/home" replace />
          } />

          {/* Public Routes */}
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/menu" element={
            <ProtectedRoute>
              <MenuMakanan />
            </ProtectedRoute>
          } />
          <Route path="/pesan" element={
            <ProtectedRoute>
              <Pemesanan />
            </ProtectedRoute>
          } />
          <Route path="/deliveries" element={
            <ProtectedRoute>
              <Deliveries />
            </ProtectedRoute>
          } />
          <Route path="/testimonies" element={
            <ProtectedRoute>
              <Testimoni />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Redirect unknown routes to home if authenticated, or login if not */}
          <Route path="*" element={
            <Navigate to="/home" replace />
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
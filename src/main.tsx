import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// 1. Impor QueryClient dan QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. Buat instance QueryClient (di luar render)
const queryClient = new QueryClient({
  // Anda bisa menambahkan konfigurasi default di sini jika perlu
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 60 * 5, // 5 menit
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 3. Bungkus komponen <App /> dengan QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
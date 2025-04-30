// src/utils/useAuth.ts (atau src/hooks/useAuth.ts)
import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Impor context dari AuthProvider.tsx

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Kembalikan apa pun yang dikembalikan oleh hook Anda (misalnya, context)
  return context;
};
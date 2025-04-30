// src/pages/Profile.tsx
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; // Untuk tombol edit nanti

// Import header reusable Anda
import AppHeader from '../components/AppHeader'; // <-- SESUAIKAN PATH JIKA PERLU

const Profile: React.FC = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  // --- Data User (Placeholder) ---
  // Di aplikasi nyata, ini akan datang dari state/context/API
  const userData = {
    name: 'Lestari Sinaga',
    // email: 'lestari.s@example.com', // Contoh data lain
    profilePictureUrl: null, // null berarti pakai placeholder
  };

  // --- Handler untuk Tombol Edit ---
  const handleEditProfile = () => {
    console.log('Tombol Edit Profil diklik');
    // TODO: Arahkan ke halaman form edit profil
    // navigate('/profile/edit'); // Contoh navigasi
    alert('Navigasi ke halaman edit belum diimplementasikan.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 relative pb-20">
      {/* Gunakan komponen AppHeader */}
      {/* Anda bisa memutuskan link mana yang aktif atau tidak sama sekali */}
      <AppHeader />

      {/* Main Content Area */}
      {/* Dibuat lebih sempit (max-w-xl) dan konten ditengahkan */}
      <main className="flex-grow max-w-xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center">

        {/* Judul Halaman (Opsional, bisa dihapus jika header sudah cukup) */}
        {/* <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-8">Profil Saya</h2> */}

        {/* Placeholder Gambar Profil */}
        <div className="bg-gray-300 rounded-full h-28 w-28 sm:h-36 sm:w-36 flex items-center justify-center mb-5 border-4 border-white shadow-md overflow-hidden">
          {userData.profilePictureUrl ? (
            <img src={userData.profilePictureUrl} alt="Profil" className="h-full w-full object-cover" />
          ) : (
            // Placeholder Ikon jika tidak ada gambar
            <UserCircleIcon className="h-20 w-20 sm:h-24 sm:w-24 text-gray-500" />
          )}
        </div>

        {/* Placeholder Teks Bergelombang (jika ingin meniru persis) */}
        <div className="text-center text-gray-400 mb-2 text-sm">
          ~~~~~~<br/>
          ~~~~~~
        </div>

        {/* Nama Pengguna */}
        <p className="text-lg sm:text-xl font-medium text-gray-900 mb-8">
          {userData.name}
        </p>

        {/* Tombol Edit Profil */}
        <button
          onClick={handleEditProfile}
          className="bg-white text-gray-700 py-2 px-8 rounded border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition duration-150 ease-in-out shadow-sm"
        >
          Edit Profil
        </button>

      </main>

      {/* Ikon Profil Bawah Kanan */}
      {/* Kita bisa buat ini link ke halaman profil ini sendiri atau hilangkan jika redundan */}
      {/* <Link to="/profile"> */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 text-center cursor-pointer group">
          <UserCircleIcon className="h-9 w-9 sm:h-10 sm:w-10 text-gray-500 group-hover:text-gray-700 mx-auto" aria-label="User Profile" />
          <span className="text-xs text-gray-600 mt-1 block group-hover:text-gray-800">Profil</span>
        </div>
      {/* </Link> */}

    </div>
  );
};

export default Profile;
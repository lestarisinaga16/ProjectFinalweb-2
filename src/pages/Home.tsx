import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Pesan', href: '/pesan' }, 
    { name: 'Pengiriman', href: '/deliveries' }, 
    { name: 'Testimoni', href: '/testimonies' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative pb-20">
      <header className="w-full bg-red-800 text-white">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-center space-x-6 sm:space-x-10 h-12 items-center text-sm sm:text-base">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-white hover:text-yellow-500 transition duration-150 ease-in-out"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-16 sm:pt-20">
        <h1 className="text-3xl sm:text-4xl font-semibold text-black mb-4 sm:mb-6">
          Selamat Datang di Dapur Rumahan
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Menyajikan masakan rumahan autentik Indonesia dengan cita rasa yang menggugah selera
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Bahan Segar</h3>
            <p className="text-gray-600">Menggunakan bahan-bahan pilihan berkualitas tinggi</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pengiriman Cepat</h3>
            <p className="text-gray-600">Layanan pengiriman cepat ke seluruh area</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Harga Terjangkau</h3>
            <p className="text-gray-600">Harga bersahabat dengan kualitas terbaik</p>
          </div>
        </div>

        <Link to="/menu">
          <button
            type="button"
            className="bg-red-500 text-white py-3 px-8 rounded-md border border-red-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500 transition duration-150 ease-in-out shadow-sm mb-12 sm:mb-16 text-lg font-medium"
          >
            Pesan Sekarang
          </button>
        </Link>

        <div className="text-center text-gray-600">
          <p className="text-sm font-medium mb-1 text-red-500">Hubungi Kami</p>
          <p className="text-lg text-yellow-600">+62 8563729 Lesti</p>
          <p className="text-sm mt-2">Buka setiap hari: 08.00 - 20.00 WIB</p>
        </div>
      </main>

      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10">
        <Link to="/profile">
          <UserCircleIcon className="h-9 w-9 sm:h-10 sm:w-10 text-red-500 hover:text-yellow-500 cursor-pointer" aria-label="Profil Pengguna" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
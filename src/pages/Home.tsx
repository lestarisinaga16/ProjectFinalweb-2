import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; 

const Home: React.FC = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Pesan', href: '/pesan' }, 
    { name: 'Pengiriman', href: '/deliveries' }, 
    { name: 'Testimonies', href: '/testimonies' },
  ];

  
  const imageUrl = "PASTE_URL_GAMBAR_LANGSUNG_YANG_ANDA_SALIN_DI_SINI"; 
  const imageAlt = "Nasi dengan daging rendang dan sayuran"; 
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative pb-20">

      {}
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

      {}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-16 sm:pt-20">

        {}
        <h1 className="text-3xl sm:text-4xl font-semibold text-black mb-8 sm:mb-10">
          Selamat datang di Dapur Rumahan!!
        </h1>

        {}
        <div className="mb-10 sm:mb-12">
          {}
          <img
            src={imageUrl} 
            alt={imageAlt} 
            className="h-24 w-24 sm:h-32 sm:w-32 mx-auto object-cover rounded-full shadow-md" 
          />
          {}
        </div>

        {}
        <Link to="/menu">
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-6 rounded-md border border-red-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500 transition duration-150 ease-in-out shadow-sm mb-12 sm:mb-16"
          >
            Pesan Sekarang
          </button>
        </Link>

        {}
        <div className="text-center text-gray-600">
          <p className="text-sm font-medium mb-1 text-red-500">Contact</p>
          <p className="text-lg text-yellow-600">+62 8563729 Lesti</p>
        </div>

      </main>

      {}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10">
         <UserCircleIcon className="h-9 w-9 sm:h-10 sm:w-10 text-red-500 hover:text-yellow-500 cursor-pointer" aria-label="User Profile" />
      </div>

    </div>
  );
};

export default Home;
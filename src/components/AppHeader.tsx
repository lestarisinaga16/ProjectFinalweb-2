// src/components/AppHeader.tsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Gunakan NavLink untuk styling aktif

const AppHeader: React.FC = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Pesan', href: '/pesan' },
    // Pastikan path pengiriman benar, sesuaikan jika perlu
    { name: 'Pengiriman', href: '/deliveries' }, // Atau mungkin '/pengiriman'?
    { name: 'Testimonies', href: '/testimonies' },
  ];

  // Definisikan gaya dasar dan gaya aktif untuk link
  const baseLinkStyle = "relative text-white hover:text-yellow-300 transition duration-150 ease-in-out pb-1";
  // Gaya aktif (misalnya, garis bawah kuning)
  const activeLinkStyle = "font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-yellow-400";

  return (
    <header className="w-full bg-red-800 text-white">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-center space-x-6 sm:space-x-10 h-12 items-center text-sm sm:text-base">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                // className menerima fungsi untuk menentukan gaya berdasarkan status 'isActive'
                className={({ isActive }) =>
                  `${baseLinkStyle} ${isActive ? activeLinkStyle : ''}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
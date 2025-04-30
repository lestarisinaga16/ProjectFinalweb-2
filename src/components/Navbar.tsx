import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

// Interface for Navigation Item structure
interface NavItem {
  name: string;
  path: string; // The route path
}

// Define the navigation items data
const navigationItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Pesan', path: '/pesan' },
  { name: 'Pengiriman', path: '/pengiriman' },
  { name: 'Testimonies', path: '/testimoni' }, // Corrected spelling from wireframe
];

// Interface for Navbar props
interface NavbarProps {
  // We can use useLocation hook instead of passing activePage prop manually
}

const Navbar: React.FC<NavbarProps> = () => {
    const location = useLocation(); // Hook to get the current location object
    const currentPath = location.pathname; // Get the current path (e.g., "/menu")

    return (
      <header className="w-full border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
        {/* Added sticky, top-0, bg-white, z-10 for fixed navbar, shadow-sm for subtle shadow */}
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-center space-x-4 sm:space-x-8 md:space-x-10 h-14 items-center text-sm sm:text-base"> {/* Increased height slightly */}
            {navigationItems.map((item) => {
                // Determine if the current path matches the item's path
                // Handle exact match for home '/' and partial match for others
                const isActive = (item.path === '/' && currentPath === '/') || (item.path !== '/' && currentPath.startsWith(item.path));

                return (
                  <li key={item.name}>
                    <Link // Use Link component for client-side routing
                      to={item.path}
                      className={`py-1 px-2 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 ${
                        isActive
                          ? 'font-semibold text-indigo-600 bg-indigo-50' // Active styles
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' // Inactive styles
                      }`}
                      aria-current={isActive ? 'page' : undefined} // Accessibility
                    >
                      {item.name}
                    </Link>
                  </li>
                );
            })}
          </ul>
        </nav>
      </header>
    );
};

export default Navbar;
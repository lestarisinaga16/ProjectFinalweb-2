// MenuMakanan.tsx

import React, { useState } from 'react';
// Import necessary icons from Heroicons
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

// === 1. IMPORT AddMenuForm ===
import AddMenuForm from '../components/AddMenuForm';
// Define the structure for a menu item
interface FoodItem {
  id: number;
  nama: string;
  harga: number;
  status: 'Tersedia' | 'Habis';
}

// Definisikan tipe data yang diterima dari AddMenuForm (sesuaikan dengan AddMenuForm.tsx)
interface SubmittedMenuData {
    nama: string;
    harga: number;
    status: 'Tersedia' | 'Habis';
    deskripsi: string; // Form memiliki deskripsi, meskipun FoodItem tidak
}


// Sample data - Updated to include requested items
const initialMenuData: FoodItem[] = [
  { id: 1, nama: 'Nasi Uduk', harga: 10000, status: 'Tersedia' },
  { id: 2, nama: 'Es Cendol', harga: 5000, status: 'Tersedia' },
  { id: 3, nama: 'Kue Lumpur', harga: 8000, status: 'Tersedia' },
  { id: 4, nama: 'Nasi Goreng', harga: 15000, status: 'Tersedia' },
  { id: 5, nama: 'Ayam Goreng', harga: 18000, status: 'Tersedia' },
  { id: 6, nama: 'Napinadar', harga: 25000, status: 'Tersedia' },
];

// Reusable Header Navigation - Updated with Red Background
const AppHeader: React.FC = () => {
    const navItems = [
      { name: 'Home', href: '/' },
      { name: 'Menu', href: '/menu' },
      { name: 'Pesan', href: '/pesan' },
      { name: 'Pengiriman', href: '/deliveries' },
      { name: 'Testimonies', href: '/testimonies' },
    ];
    return (
        <header className="w-full bg-red-700 text-white shadow-md">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-center space-x-6 sm:space-x-10 h-14 items-center text-sm sm:text-base">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href}
                  className={`pb-1 border-b-2 transition duration-150 ease-in-out ${
                    item.name === 'Menu' ? 'border-yellow-400 text-white font-semibold'
                     : 'border-transparent text-gray-200 hover:text-white hover:border-yellow-400'
                  }`}> {item.name} </a>
              </li> ))}
          </ul> </nav> </header> ); };


const MenuMakanan: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState<FoodItem[]>(initialMenuData);
  // === 2. State untuk visibilitas form ===
  const [isAdding, setIsAdding] = useState(false);
  // State untuk menampung data item yang sedang diedit (opsional, untuk langkah selanjutnya)
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);


  // === 3. Modifikasi handleTambahMakanan ===
  const handleTambahMakanan = () => {
    setEditingItem(null); // Pastikan tidak dalam mode edit
    setIsAdding(true);    // Tampilkan form
  };

  // Modifikasi handleEditItem untuk membuka form dengan data awal
  const handleEditItem = (id: number) => {
    const itemToEdit = menuItems.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit); // Set data item yang akan diedit
      setIsAdding(true);       // Tampilkan form (dalam mode edit)
    }
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDeleteItem = (id: number) => {
    console.log(`Delete item with ID: ${id}`);
    // Konfirmasi sebelum hapus (opsional tapi bagus)
    if (window.confirm(`Apakah Anda yakin ingin menghapus item ini?`)) {
        setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  // === 5. Handler untuk onCancel dari AddMenuForm ===
  const handleCancelAdd = () => {
    setIsAdding(false); // Sembunyikan form
    setEditingItem(null); // Reset mode edit
  };

  // === 5. & 6. Handler untuk onSubmit dari AddMenuForm ===
  const handleSaveMenu = (formData: SubmittedMenuData) => {
    console.log("Saving data:", formData);

    if (editingItem) {
      // --- Logic Update ---
      setMenuItems(prevItems =>
        prevItems.map(item =>
          item.id === editingItem.id
            ? { ...item, // Pertahankan ID
                nama: formData.nama,
                harga: formData.harga,
                status: formData.status,
                // deskripsi tidak ada di FoodItem, jadi tidak diupdate
              }
            : item // Item lain tidak berubah
        )
      );
      alert('Menu berhasil diperbarui!');

    } else {
      // --- Logic Add New ---
      // Buat ID baru (cara sederhana, bisa lebih kompleks di aplikasi nyata)
      const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;

      const newFoodItem: FoodItem = {
        id: newId,
        nama: formData.nama,
        harga: formData.harga, // Harga sudah number dari form
        status: formData.status,
        // deskripsi dari form tidak dimasukkan ke FoodItem karena tidak ada fieldnya
      };

      setMenuItems(prevItems => [...prevItems, newFoodItem]); // Tambahkan item baru ke state
      alert('Menu baru berhasil ditambahkan!');
    }


    setIsAdding(false); // Sembunyikan form setelah submit
    setEditingItem(null); // Reset mode edit
  };


  const filteredMenuItems = menuItems.filter(item =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
      return amount.toLocaleString('id-ID');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 relative pb-20">

      <AppHeader />

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Top Section: Title, Add Button, Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-4">
          <div className='flex flex-col items-start'>
             <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Menu Makanan</h2>
             {/* Tombol Tambah Makanan hanya tampil jika form tidak aktif */}
             {!isAdding && (
                <button
                    onClick={handleTambahMakanan} // Handler sudah diupdate
                    className="bg-yellow-500 text-white text-sm py-1.5 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500 transition duration-150 ease-in-out shadow-sm"
                >
                    Tambah Makanan
                </button>
             )}
          </div>

          {/* Search Bar tidak berubah */}
          <div className="relative w-full sm:w-auto">
            <input
              type="search" placeholder="Cari Makanan..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500" />
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* === 4. Tampilkan Form Secara Kondisional === */}
        {isAdding && (
          <div className="my-6 bg-white p-4 md:p-6 border border-gray-200 rounded-lg shadow-md">
            {/* === 7. Lewatkan Props ke AddMenuForm === */}
            <AddMenuForm
              onSubmit={handleSaveMenu} // Handler untuk simpan
              onCancel={handleCancelAdd} // Handler untuk batal
              initialData={editingItem ?? undefined} // Kirim data jika mode edit
            />
          </div>
        )}


        {/* Separator tidak berubah */}
        <div className="flex items-center space-x-1 mb-4 opacity-50">
           <div className="h-1 w-4 bg-gray-400 rounded-full"></div>
           <div className="h-1 w-4 bg-gray-400 rounded-full"></div>
        </div>


        {/* Menu Table */}
        {/* Cek apakah form sedang aktif, jika ya, tabel bisa disembunyikan atau tetap tampil */}
        {/* {!isAdding && ( // <-- Uncomment baris ini dan penutupnya jika ingin tabel hilang saat form aktif */}
            <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Makanan</th>
                    <th scope="col" className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Harga (Rp)</th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                        <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.nama}</td>
                        <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(item.harga)}</td>
                        <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">
                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === 'Tersedia' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>{item.status}</span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center items-center space-x-3">
                            <button onClick={() => handleEditItem(item.id)} // Handler edit sudah diupdate
                                className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out" title="Edit">
                            <PencilSquareIcon className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDeleteItem(item.id)}
                                className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out" title="Hapus">
                            <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr><td colSpan={4} className="px-5 py-4 text-center text-sm text-gray-500">
                    {searchQuery ? 'Makanan tidak ditemukan.' : 'Belum ada data menu.'}
                    </td></tr>
                )}
                </tbody>
            </table>
            </div>
        {/* )} */} {/* <-- Penutup uncomment jika tabel disembunyikan */}

      </main>

      {/* User Icon tidak berubah */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10">
         <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition" title="User Profile">
             <UserCircleIcon className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 hover:text-gray-700" aria-label="User Profile" />
         </button>
      </div>

    </div>
  );
};

export default MenuMakanan;
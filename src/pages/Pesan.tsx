import React, { useState, useEffect } from 'react';
import {
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

// Import kedua form
import AddOrderForm from '../components/AddOrderForm';
import EditOrderForm from '../components/EditOrderForm';

// Interface (tetap sama)
interface FoodItem { id: number; nama: string; harga: number; status: 'Tersedia' | 'Habis'; }
interface NewOrderData { menuItemId: number; quantity: number; customerName: string; notes: string; }
interface OrderItem { id: number; nama: string; noHp: string; alamat: string; catatan: string; }

// Data Awal (tetap sama)
const initialOrderData: OrderItem[] = [ { id: 1, nama: 'Lestari', noHp: '+627207138', alamat: 'Unai', catatan: 'Pedas' }, ];

// Header (tetap sama)
const AppHeader: React.FC = () => {
    const navItems = [
      { name: 'Home', href: '/' },
      { name: 'Menu', href: '/menu' },
      { name: 'Pesan', href: '/pesan' },
      { name: 'Pengiriman', href: '/deliveries' },
      { name: 'Testimonies', href: '/testimonies' }, ];
    return ( <header className="w-full bg-red-700 text-white shadow-md"> <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <ul className="flex justify-center space-x-6 sm:space-x-10 h-14 items-center text-sm sm:text-base"> {navItems.map((item) => ( <li key={item.name}> <a href={item.href} className={`pb-1 border-b-2 transition duration-150 ease-in-out ${ item.name === 'Pesan' ? 'border-yellow-400 text-white font-semibold' : 'border-transparent text-gray-200 hover:text-white hover:border-yellow-400' }`}> {item.name} </a> </li> ))} </ul> </nav> </header> );
};


const Pemesanan: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrderData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [availableMenus, setAvailableMenus] = useState<FoodItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderItem | null>(null);

  useEffect(() => {
    const fetchedMenus: FoodItem[] = [ { id: 1, nama: 'Nasi Uduk', harga: 10000, status: 'Tersedia' }, { id: 2, nama: 'Es Cendol', harga: 5000, status: 'Tersedia' }, { id: 4, nama: 'Nasi Goreng', harga: 15000, status: 'Tersedia' }, { id: 5, nama: 'Ayam Goreng', harga: 18000, status: 'Tersedia' }, { id: 6, nama: 'Napinadar', harga: 25000, status: 'Tersedia' }, { id: 99, nama: 'Soto Ayam', harga: 12000, status: 'Habis' }, ];
    setAvailableMenus(fetchedMenus);
  }, []);

  const handleTambahPesanan = () => { setIsEditing(false); setEditingOrder(null); setShowAddForm(true); };
  const handleCancelAddForm = () => { setShowAddForm(false); };
  const handleNewOrderSubmit = (formData: NewOrderData) => {
    const newOrderId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const newOrder: OrderItem = { id: newOrderId, nama: formData.customerName, noHp: '+620000000', alamat: 'Alamat Placeholder', catatan: formData.notes, };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    alert(`Pesanan baru untuk ${newOrder.nama} berhasil ditambahkan!`);
    setShowAddForm(false);
  };

  const handleEditOrder = (id: number) => {
    const orderToEdit = orders.find(order => order.id === id);
    if (orderToEdit) { setShowAddForm(false); setEditingOrder(orderToEdit); setIsEditing(true); console.log(`Editing order with ID: ${id}`, orderToEdit); }
  };
  const handleCancelEdit = () => { setIsEditing(false); setEditingOrder(null); };
  const handleUpdateOrder = (updatedOrderData: OrderItem) => {
    console.log("Updating order:", updatedOrderData);
    setOrders(prevOrders => prevOrders.map(order => order.id === updatedOrderData.id ? updatedOrderData : order ));
    alert(`Pesanan untuk ${updatedOrderData.nama} berhasil diperbarui!`);
    setIsEditing(false); setEditingOrder(null);
  };

  // --- Handler Hapus (Perbaikan) ---
  // Hapus baris 'const handleDeleteOrder = (id: number) => { /* ... kode hapus ... */ };'
  const handleDeleteOrder = (id: number) => { // <-- Hanya satu deklarasi ini
    console.log(`Delete order with ID: ${id}`);
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    }
  };
  // --- Akhir Handler Hapus ---


  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative pb-20">
      <AppHeader />
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex justify-between items-center mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Pemesan</h2>
          {!showAddForm && !isEditing && (
            <button onClick={handleTambahPesanan} className="bg-yellow-500 text-white text-sm py-1.5 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500 transition duration-150 ease-in-out shadow-sm">
                Tambah pesanan
            </button>
          )}
        </div>

         {showAddForm && (
            <div className="my-6">
                <AddOrderForm availableMenus={availableMenus} onSubmit={handleNewOrderSubmit} onCancel={handleCancelAddForm} />
            </div>
         )}

         {isEditing && editingOrder && (
            <div className="my-6">
                <EditOrderForm orderToEdit={editingOrder} onSubmit={handleUpdateOrder} onCancel={handleCancelEdit} />
            </div>
         )}

        <div className="flex items-center space-x-1 mb-4 opacity-50"> <div className="h-1 w-4 bg-gray-400 rounded-full"></div> <div className="h-1 w-4 bg-gray-400 rounded-full"></div> </div>

        {!showAddForm && !isEditing && (
            <div className="overflow-x-auto shadow border-b border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead className="bg-gray-50"> <tr> <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Nama Pemesan</th> <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">No.Hp</th> <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Alamat</th> <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Catatan</th> <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th> </tr> </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                    orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">{order.nama}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 border-r border-gray-300">{order.noHp}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 border-r border-gray-300">{order.alamat}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 border-r border-gray-300">{order.catatan}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center items-center space-x-3">
                            <button onClick={() => handleEditOrder(order.id)} className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out" title="Edit Pesanan"><PencilSquareIcon className="h-5 w-5" /></button>
                            <button onClick={() => handleDeleteOrder(order.id)} className="text-gray-500 hover:text-red-600 transition duration-150 ease-in-out" title="Hapus Pesanan"><TrashIcon className="h-5 w-5" /></button>
                        </div>
                        </td>
                    </tr> ))
                ) : ( <tr><td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">Belum ada pesanan.</td></tr> )}
                </tbody>
            </table>
            </div>
        )}
      </main>
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10"> <UserCircleIcon className="h-9 w-9 sm:h-10 sm:w-10 text-gray-500 hover:text-gray-700 cursor-pointer" aria-label="User Profile" /> </div>
    </div>
  );
};

export default Pemesanan;
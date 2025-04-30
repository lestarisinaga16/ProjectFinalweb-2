// src/components/AddOrderForm.tsx

import React, { useState, useEffect } from 'react';

// --- (Salin/tempel interface FoodItem, NewOrderData, OrderFormData, AddOrderFormProps dari atas) ---
interface FoodItem { id: number; nama: string; harga: number; status: 'Tersedia' | 'Habis'; }
interface NewOrderData { menuItemId: number; quantity: number; customerName: string; notes: string; }
interface OrderFormData { menuItemId: string; quantity: string; customerName: string; notes: string; }
interface AddOrderFormProps { availableMenus: FoodItem[]; onSubmit: (orderData: NewOrderData) => void; onCancel: () => void; }
// ---

const AddOrderForm: React.FC<AddOrderFormProps> = ({ availableMenus, onSubmit, onCancel }) => {

  // Filter hanya menu yang tersedia saat pertama kali render atau saat props berubah
  const orderableMenus = availableMenus.filter(item => item.status === 'Tersedia');

  const [formData, setFormData] = useState<OrderFormData>({
    // Set default ke item pertama yang tersedia jika ada
    menuItemId: orderableMenus.length > 0 ? orderableMenus[0].id.toString() : '',
    quantity: '1', // Default jumlah 1
    customerName: '',
    notes: '',
  });

  // Update default menu item jika daftar menu berubah setelah render awal
  useEffect(() => {
      if (orderableMenus.length > 0 && !orderableMenus.find(m => m.id.toString() === formData.menuItemId)) {
          setFormData(prev => ({ ...prev, menuItemId: orderableMenus[0].id.toString() }));
      } else if (orderableMenus.length === 0) {
          setFormData(prev => ({ ...prev, menuItemId: '' }));
      }
  }, [availableMenus]); // Bergantung pada availableMenus


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi dasar
    const quantityNum = parseInt(formData.quantity, 10);
    if (!formData.menuItemId || !formData.customerName || isNaN(quantityNum) || quantityNum <= 0) {
        alert('Silakan pilih menu, isi nama pelanggan, dan masukkan jumlah yang valid (minimal 1).');
        return;
    }
     if (!orderableMenus.some(m => m.id.toString() === formData.menuItemId)) {
        alert('Menu yang dipilih tidak tersedia atau tidak valid.');
        return;
     }

    const dataToSubmit: NewOrderData = {
      menuItemId: parseInt(formData.menuItemId, 10),
      quantity: quantityNum,
      customerName: formData.customerName.trim(),
      notes: formData.notes.trim(),
    };

    onSubmit(dataToSubmit);

    // Opsional: Reset form (atau biarkan parent yang handle)
    // setFormData({ menuItemId: orderableMenus.length > 0 ? orderableMenus[0].id.toString() : '', quantity: '1', customerName: '', notes: '' });
  };

  // Tampilkan pesan jika tidak ada menu yang bisa dipesan
  if (orderableMenus.length === 0) {
      return <p className="text-center text-red-600 p-4 border border-red-300 rounded bg-red-50">Tidak ada menu yang tersedia untuk dipesan saat ini.</p>;
  }

  return (
    <div className="border border-gray-400 p-6 md:p-8 max-w-lg mx-auto bg-white rounded shadow-md">
      {/* Judul Form (bisa disesuaikan) */}
      <h2 className="text-xl font-semibold text-center mb-6">Formulir Pesanan</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <h3 className="text-lg font-medium mb-4">Tambah Pesanan Baru</h3>

        {/* Pilih Menu Makanan */}
        <div>
          <label htmlFor="menuItemId" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Makanan/Minuman
          </label>
          <select
            id="menuItemId"
            name="menuItemId"
            value={formData.menuItemId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {/* Opsi default bisa ditambahkan jika mau */}
            {/* <option value="" disabled>-- Pilih Menu --</option> */}
            {orderableMenus.map(item => (
              <option key={item.id} value={item.id.toString()}>
                {item.nama} (Rp {item.harga.toLocaleString('id-ID')})
              </option>
            ))}
          </select>
        </div>

        {/* Jumlah & Nama Pelanggan (dalam satu baris) */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-5 sm:space-y-0">
          {/* Jumlah */}
          <div className="flex-1">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1" // Minimal pesan 1
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Nama Pelanggan */}
          <div className="flex-1">
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pelanggan
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Catatan (Opsional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Misal: tidak pedas, tambah es..."
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tombol Simpan Pesanan & Batal */}
        <div className="flex flex-col sm:flex-row justify-start sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
          <button
            type="submit"
            className="px-5 py-2 border border-gray-500 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition duration-150"
          >
            Simpan Pesanan
          </button>
          <button
            type="button" // PENTING: type="button"
            onClick={onCancel} // Panggil fungsi onCancel dari props
            className="px-5 py-2 border border-gray-500 rounded bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition duration-150"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;
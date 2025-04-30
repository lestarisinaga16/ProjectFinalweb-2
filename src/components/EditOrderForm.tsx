// src/components/EditOrderForm.tsx

import React, { useState, useEffect } from 'react';

// Interface for the order item (same as in Pemesanan.tsx)
interface OrderItem {
  id: number;
  nama: string;
  noHp: string;
  alamat: string;
  catatan: string;
}

// Interface for the props this component receives
interface EditOrderFormProps {
  orderToEdit: OrderItem; // The specific order data to pre-fill the form
  onSubmit: (updatedOrderData: OrderItem) => void; // Function to call when saving
  onCancel: () => void; // Function to call when canceling
}

const EditOrderForm: React.FC<EditOrderFormProps> = ({ orderToEdit, onSubmit, onCancel }) => {

  // State to hold the form data, initialized with the order being edited
  const [formData, setFormData] = useState<OrderItem>(orderToEdit);

  // Update state if the orderToEdit prop changes (e.g., user clicks edit on a different row)
  useEffect(() => {
    setFormData(orderToEdit);
  }, [orderToEdit]);

  // Handler for input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (can be expanded)
    if (!formData.nama || !formData.noHp || !formData.alamat) {
        alert('Nama Pemesan, No. HP, dan Alamat wajib diisi!');
        return;
    }
    onSubmit(formData); // Send the updated data back to the parent
  };

  return (
    <div className="border border-gray-400 p-6 md:p-8 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold text-center mb-6">Edit Detail Pesanan</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hidden input to keep track of ID, or rely on parent state */}
        {/* <input type="hidden" name="id" value={formData.id} /> */}

        {/* Nama Pemesan */}
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Pemesan
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* No. HP & Alamat (dalam satu baris) */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-5 sm:space-y-0">
          {/* No. HP */}
          <div className="flex-1">
            <label htmlFor="noHp" className="block text-sm font-medium text-gray-700 mb-1">
              No. HP
            </label>
            <input
              type="text" // Use text for phone numbers to allow '+' or formatting
              id="noHp"
              name="noHp"
              value={formData.noHp}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Alamat */}
          {/* If Alamat needs more space, move it to its own row like Deskripsi */}
          <div className="flex-1">
             <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
             </label>
             <input
                type="text"
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
             />
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label htmlFor="catatan" className="block text-sm font-medium text-gray-700 mb-1">
            Catatan
          </label>
          <textarea
            id="catatan"
            name="catatan"
            rows={3}
            value={formData.catatan}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tombol Simpan & Batal */}
        <div className="flex flex-col sm:flex-row justify-start sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
          <button
            type="submit"
            className="px-5 py-2 border border-gray-500 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition duration-150"
          >
            Update Pesanan
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

export default EditOrderForm;
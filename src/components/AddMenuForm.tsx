// src/components/AddMenuForm.tsx

import React, { useState } from 'react';

// Interface untuk data yang dikelola di dalam state form ini
interface MenuFormData {
  nama: string;
  harga: string; // Simpan sebagai string untuk input, parse saat submit
  status: 'Tersedia' | 'Habis';
  deskripsi: string;
}

// Interface untuk data yang akan dikirim ke parent saat submit
// (harga sudah menjadi number)
interface SubmittedMenuData {
    nama: string;
    harga: number;
    status: 'Tersedia' | 'Habis';
    deskripsi: string;
    // Anda mungkin perlu menambahkan 'kategori' di sini jika form ini
    // digunakan oleh komponen Menu sebelumnya yang memiliki kategori.
    // Jika ya, tambahkan input kategori juga di form ini.
}


// Interface untuk props yang diterima komponen ini
interface AddMenuFormProps {
  onSubmit: (formData: SubmittedMenuData) => void; // Fungsi dipanggil saat Simpan
  onCancel: () => void; // Fungsi dipanggil saat Batal
  initialData?: Partial<SubmittedMenuData>; // Opsional: untuk mode edit
}

const AddMenuForm: React.FC<AddMenuFormProps> = ({ onSubmit, onCancel, initialData }) => {
  // State untuk menampung data form
  const [formData, setFormData] = useState<MenuFormData>({
    nama: initialData?.nama || '',
    harga: initialData?.harga?.toString() || '', // Konversi number ke string jika ada initialData
    status: initialData?.status || 'Tersedia',
    deskripsi: initialData?.deskripsi || '',
  });

  // Handler untuk setiap perubahan pada input/select/textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
  };

  // Handler saat form disubmit (klik tombol Simpan)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah refresh halaman standar form

    // Validasi sederhana (bisa diperluas)
    if (!formData.nama || !formData.harga) {
        alert('Nama Makanan dan Harga wajib diisi!');
        return;
    }

    // Persiapkan data untuk dikirim (konversi harga ke number)
    const dataToSubmit: SubmittedMenuData = {
      ...formData,
      harga: parseFloat(formData.harga) || 0, // Parse harga, default 0 jika gagal
    };

    onSubmit(dataToSubmit); // Kirim data ke parent component

    // Opsional: Reset form setelah submit (jika bukan mode edit)
    // if (!initialData) {
    //   setFormData({ nama: '', harga: '', status: 'Tersedia', deskripsi: '' });
    // }
  };

  const formTitle = initialData ? "Edit Menu Makanan" : "Tambah Menu Makanan";

  return (
    // Container Form dengan border dan padding, sesuai gambar kasar
    <div className="border border-gray-400 p-6 md:p-8 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold text-center mb-6">Add Menu Form</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <h3 className="text-lg font-medium mb-4">{formTitle}</h3>

        {/* Nama Makanan */}
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Makanan
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

        {/* Harga & Status (dalam satu baris) */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-5 sm:space-y-0">
          {/* Harga */}
          <div className="flex-1">
            <label htmlFor="harga" className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              min="0" // Harga tidak boleh negatif
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div className="flex-1">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-400 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Habis">Habis</option>
            </select>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={3}
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tombol Simpan & Batal */}
        <div className="flex flex-col sm:flex-row justify-start sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
          <button
            type="submit"
            className="px-5 py-2 border border-gray-500 rounded bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition duration-150"
          >
            Simpan
          </button>
          <button
            type="button" // PENTING: type="button" agar tidak men-submit form
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

export default AddMenuForm;
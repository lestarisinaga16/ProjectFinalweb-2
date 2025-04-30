// src/components/AddDeliveries.tsx
import React, { useState, useEffect } from 'react';
// Impor tipe DARI Pengiriman.tsx (pastikan path benar)
import { DeliveryDetail, DeliveryStatus } from '../pages/Deliveries'; // Adjusted path

interface AddDeliveriesFormProps {
    initialData?: DeliveryDetail | null; // Data awal untuk mode edit (opsional)
    onAddDelivery: (newDeliveryData: DeliveryDetail) => void; // Fungsi untuk menambah
    onUpdateDelivery: (updatedDeliveryData: DeliveryDetail) => void; // Fungsi untuk update
    onCancel: () => void; // Fungsi untuk batal
}

const AddDeliveriesForm: React.FC<AddDeliveriesFormProps> = ({
    initialData,
    onAddDelivery,
    onUpdateDelivery,
    onCancel
}) => {
    const isEditMode = !!initialData; // Cek apakah mode edit aktif

    // State untuk field form
    const [namaPemesan, setNamaPemesan] = useState('');
    const [alamat, setAlamat] = useState('');
    const [noHp, setNoHp] = useState('');
    const [pesananItems, setPesananItems] = useState('');
    const [total, setTotal] = useState<number | ''>('');
    const [catatan, setCatatan] = useState('');
    // Status tidak diubah di form ini, diambil dari initialData atau default
    const [currentStatus, setCurrentStatus] = useState<DeliveryStatus>('Diproses');

    // useEffect untuk mengisi form saat mode edit atau initialData berubah
    useEffect(() => {
        if (isEditMode && initialData) {
            setNamaPemesan(initialData.namaPemesan);
            setAlamat(initialData.alamat);
            setNoHp(initialData.noHp);
            setPesananItems(initialData.pesananItems);
            setTotal(initialData.total);
            setCatatan(initialData.catatan);
            setCurrentStatus(initialData.status); // Simpan status saat ini
        } else {
            // Reset form jika tidak mode edit (misalnya setelah edit lalu klik tambah)
            setNamaPemesan('');
            setAlamat('');
            setNoHp('');
            setPesananItems('');
            setTotal('');
            setCatatan('');
            setCurrentStatus('Diproses'); // Status default untuk tambah
        }
    }, [initialData, isEditMode]); // Re-run if initialData changes

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validasi Sederhana
        if (!namaPemesan || !alamat || !noHp || !pesananItems || total === '') {
            alert('Harap isi semua field yang wajib diisi (Nama, Alamat, No HP, Pesanan, Total).');
            return;
        }
        if (isNaN(Number(total)) || Number(total) < 0) {
             alert('Total harus berupa angka positif.');
             return;
        }

        const deliveryData = {
            // Jika mode edit, gunakan ID yang ada, jika tidak buat ID baru
            idPesanan: isEditMode ? initialData.idPesanan : `P${Date.now().toString().slice(-4)}`,
            namaPemesan,
            alamat,
            noHp,
            pesananItems,
            total: Number(total),
            catatan,
            status: isEditMode ? currentStatus : 'Diproses', // Pertahankan status jika edit, atau 'Diproses' jika baru
        };

        if (isEditMode) {
            onUpdateDelivery(deliveryData); // Panggil fungsi update
        } else {
            onAddDelivery(deliveryData); // Panggil fungsi tambah
        }
    };

    return (
        <div className="border border-gray-300 rounded-md p-4 sm:p-6 mb-8 bg-gray-50 shadow-md">
             <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
                {/* Judul dinamis */}
                {isEditMode ? 'Edit Delivery Form' : 'Add Delivery Form'}
            </h3>
            <p className="text-sm text-gray-600 mb-4 text-center border-b pb-3">
                {/* Sub-judul dinamis */}
                {isEditMode ? `Edit Data Pengiriman ${initialData?.idPesanan}` : 'Tambah Pengiriman Baru'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field input seperti sebelumnya (Nama, No HP, Total, Alamat, Pesanan, Catatan) */}
                 {/* 1. Nama Pemesan */}
                 <div>
                    <label htmlFor="namaPemesan" className="block text-sm font-medium text-gray-700 mb-1"> Nama Pemesan <span className="text-red-500">*</span> </label>
                    <input type="text" id="namaPemesan" value={namaPemesan} onChange={(e) => setNamaPemesan(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Masukkan nama pemesan" />
                </div>
                 {/* 2. No HP & Total Harga */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="noHp" className="block text-sm font-medium text-gray-700 mb-1"> Nomor HP <span className="text-red-500">*</span> </label>
                        <input type="tel" id="noHp" value={noHp} onChange={(e) => setNoHp(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="+6281..." />
                    </div>
                    <div>
                        <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1"> Total Harga (Rp) <span className="text-red-500">*</span> </label>
                        <input type="number" id="total" value={total} onChange={(e) => setTotal(e.target.value === '' ? '' : Number(e.target.value))} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Contoh: 28000" />
                    </div>
                </div>
                 {/* 3. Alamat */}
                 <div>
                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1"> Alamat Pengiriman <span className="text-red-500">*</span> </label>
                    <textarea id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} required rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Masukkan alamat lengkap pengiriman" />
                </div>
                 {/* 4. Detail Pesanan */}
                  <div>
                    <label htmlFor="pesananItems" className="block text-sm font-medium text-gray-700 mb-1"> Detail Pesanan <span className="text-red-500">*</span> </label>
                    <textarea id="pesananItems" value={pesananItems} onChange={(e) => setPesananItems(e.target.value)} required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Contoh: Nasi Goreng (2x), Es Teh Manis (1x)" />
                </div>
                 {/* 5. Catatan */}
                 <div>
                    <label htmlFor="catatan" className="block text-sm font-medium text-gray-700 mb-1"> Catatan (Opsional) </label>
                    <textarea id="catatan" value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Contoh: Tidak pedas, ekstra kerupuk" />
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-white text-gray-700 py-2 px-5 rounded border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition duration-150 ease-in-out shadow-sm text-sm"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-5 rounded border border-transparent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition duration-150 ease-in-out shadow-sm text-sm"
                    >
                        {/* Teks tombol dinamis */}
                        {isEditMode ? 'Update' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDeliveriesForm; // Tetap export default
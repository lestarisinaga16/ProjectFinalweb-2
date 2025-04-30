// src/pages/Testimonies.tsx (Modifikasi untuk Integrasi Form)
import React, { useState } from 'react';
// ... (impor ikon lainnya seperti sebelumnya)
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';


import AppHeader from '../components/AppHeader';
// Impor komponen form yang baru dibuat
import AddTestimonialForm from '../components/AddTestimonialForm'; // <-- Impor form

// ... (Interface TestimonialItem, Komponen StarRating seperti sebelumnya)
interface TestimonialItem { id: number; rating: number; text: string; author: string; date: string; }
const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => { /* ... kode StarRating ... */
    return ( <div className="flex items-center"> {[...Array(maxRating)].map((_, index) => { const starValue = index + 1; return ( <span key={index}> {starValue <= rating ? ( <StarIconSolid className="h-5 w-5 text-yellow-500" /> ) : ( <StarIconOutline className="h-5 w-5 text-yellow-500" /> )} </span> ); })} </div> );
};

// Komponen Halaman Utama Testimoni
const Testimoni: React.FC = () => {
  // Data awal bisa kosong jika ingin data dari API, atau pakai initial jika demo
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([
    { id: 1, rating: 5, text: '"Makanannya enak dan murah"', author: 'Lestari', date: '15 April 2025' },
    { id: 2, rating: 4, text: '"Rasanya seperti masakan rumah, sangat enak!!!"', author: 'Asep', date: '10 Mei 2025' },
  ]);
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  // State baru untuk menampilkan form tambah
  const [showAddForm, setShowAddForm] = useState(false);


  // --- Handler untuk Form Tambah ---
  const handleShowAddForm = () => {
    setShowAddForm(true);
    setEditingTestimonialId(null); // Pastikan keluar dari mode edit
  };

  const handleAddTestimonial = (newData: { author: string; rating: number; text: string }) => {
    console.log('Menambah testimoni baru:', newData);
    // TODO: Panggil API untuk menyimpan ke backend

    // Buat data lengkap untuk ditampilkan di state (ID & Tanggal sementara)
    const newTestimonial: TestimonialItem = {
      id: Date.now(), // ID sementara, ganti dengan ID dari backend
      ...newData,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'}), // Tanggal hari ini
      text: `"${newData.text}"` // Optional: tambah kutip jika mau
    };

    setTestimonials(prevTestimonials => [...prevTestimonials, newTestimonial]); // Tambah ke state
    setShowAddForm(false); // Tutup form
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false); // Tutup form
  };


  // --- Fungsi untuk Edit (seperti sebelumnya) ---
  const handleEditClick = (testimonial: TestimonialItem) => {
    setEditingTestimonialId(testimonial.id);
    setEditText(testimonial.text.replace(/^"|"$/g, '')); // Hapus kutip saat edit
    setShowAddForm(false); // Pastikan form tambah tertutup
  };

  const handleSaveEdit = () => {
     if (editingTestimonialId === null) return;
     // TODO: API Call update
     setTestimonials(prevTestimonials =>
      prevTestimonials.map(testi =>
        testi.id === editingTestimonialId
          ? { ...testi, text: `"${editText}"` } // Tambah kutip lagi saat simpan
          : testi
      )
    );
    setEditingTestimonialId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingTestimonialId(null);
    setEditText('');
  };

  // --- Fungsi untuk Hapus (seperti sebelumnya) ---
  const handleDeleteTestimoni = (idToDelete: number) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus testimoni ini?`)) {
      // TODO: API Call delete
      setTestimonials(prevTestimonials =>
        prevTestimonials.filter(testi => testi.id !== idToDelete)
      );
      if (editingTestimonialId === idToDelete) { handleCancelEdit(); }
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 relative pb-20">
      <AppHeader />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Judul dan Tombol Tambah */}
        <div className="flex justify-between items-center mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Testimoni Pelanggan</h2>
          <button
            onClick={handleShowAddForm} // Panggil fungsi untuk menampilkan form
            className="bg-red-700 text-white text-sm py-2 px-4 rounded border border-red-800 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition duration-150 ease-in-out shadow-sm"
            // Disable tombol tambah jika form tambah atau edit sedang aktif
            disabled={showAddForm || editingTestimonialId !== null}
          >
            Tambah Testimoni
          </button>
        </div>
        <hr className="mb-6 border-gray-300"/>

        {/* Tampilkan Form Tambah Jika Aktif */}
        {showAddForm && (
          <AddTestimonialForm
            onAddTestimonial={handleAddTestimonial}
            onCancel={handleCancelAddForm}
          />
        )}


        {/* Daftar Testimoni (Hanya tampil jika form tambah TIDAK aktif) */}
        {!showAddForm && (
          <div className="space-y-5">
            {testimonials.length > 0 ? (
              testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="border border-gray-300 rounded-lg p-4 shadow-md bg-white relative"
                >
                  {editingTestimonialId === testi.id ? (
                    // --- Mode Edit ---
                     <div className="space-y-3">
                        <StarRating rating={testi.rating} />
                         <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-gray-800 italic text-sm"
                            rows={3}
                         />
                         <div className="flex justify-end space-x-2 mt-2">
                            <button onClick={handleSaveEdit} className="p-1 text-green-600 hover:text-green-800" title="Simpan"><CheckIcon className="h-5 w-5" /></button>
                             <button onClick={handleCancelEdit} className="p-1 text-red-600 hover:text-red-800" title="Batal"><XMarkIcon className="h-5 w-5" /></button>
                         </div>
                      </div>
                  ) : (
                    // --- Mode Tampilan Normal ---
                    <>
                      <div className="mb-2"> <StarRating rating={testi.rating} /> </div>
                      <p className="text-gray-700 italic mb-3 text-sm sm:text-base">{testi.text}</p>
                      <p className="text-xs text-gray-500">{testi.author}, {testi.date}</p>
                      <div className="absolute top-3 right-3 flex space-x-2">
                         <button onClick={() => handleEditClick(testi)} className="p-1 text-gray-500 hover:text-blue-600" title="Edit" disabled={editingTestimonialId !== null}><PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" /></button>
                         <button onClick={() => handleDeleteTestimoni(testi.id)} className="p-1 text-gray-500 hover:text-red-600" title="Hapus" disabled={editingTestimonialId !== null}><TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" /></button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">Belum ada testimoni.</p>
            )}
          </div>
        )}
      </main>

      {/* Ikon Profil */}
       <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 text-center">
         <UserCircleIcon className="h-9 w-9 sm:h-10 sm:w-10 text-gray-500 hover:text-gray-700 cursor-pointer mx-auto" aria-label="User Profile" />
       </div>
    </div>
  );
};

export default Testimoni;
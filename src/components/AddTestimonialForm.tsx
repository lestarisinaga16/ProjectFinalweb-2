// src/components/AddTestimonialForm.tsx
import React, { useState } from 'react';
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

// Tipe data untuk props, hanya butuh data input
interface AddTestimonialFormProps {
  onAddTestimonial: (data: { author: string; rating: number; text: string }) => void;
  onCancel: () => void;
}

// Komponen kecil untuk memilih rating bintang
const ClickableStarRating: React.FC<{
  rating: number;
  setRating: (rating: number) => void;
  maxRating?: number;
}> = ({ rating, setRating, maxRating = 5 }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button" // Penting agar tidak submit form
            onClick={() => setRating(starValue)}
            className="focus:outline-none"
            aria-label={`Rate ${starValue} out of ${maxRating}`}
          >
            {starValue <= rating ? (
              <StarIconSolid className="h-6 w-6 text-yellow-500 cursor-pointer" />
            ) : (
              <StarIconOutline className="h-6 w-6 text-yellow-400 hover:text-yellow-500 cursor-pointer" />
            )}
          </button>
        );
      })}
    </div>
  );
};


// Komponen Form Utama
const AddTestimonialForm: React.FC<AddTestimonialFormProps> = ({ onAddTestimonial, onCancel }) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0); // Rating awal 0
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validasi sederhana
    if (!author || !text || rating === 0) {
      alert('Harap isi Nama, Rating (minimal 1 bintang), dan Teks Testimoni.');
      return;
    }

    onAddTestimonial({ author, rating, text });

    // Optional: Reset form setelah submit
    // setAuthor('');
    // setRating(0);
    // setText('');
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 sm:p-6 mb-8 bg-gray-50 shadow-md max-w-lg mx-auto"> {/* Batasi lebar & tengahkan */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
        Add Testimonial Form
      </h3>
      <p className="text-sm text-gray-600 mb-4 text-center border-b pb-3">
        Tambah Testimoni Baru
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. Nama Pengirim (Seperti Nama Makanan) */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Anda <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Masukkan nama Anda"
          />
        </div>

        {/* 2. Rating Bintang */}
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating <span className="text-red-500">*</span>
           </label>
           <ClickableStarRating rating={rating} setRating={setRating} />
           {rating === 0 && <p className="text-xs text-red-500 mt-1">Harap pilih rating</p>}
        </div>

        {/* 3. Teks Testimoni (Seperti Deskripsi) */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Testimoni Anda <span className="text-red-500">*</span>
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Tuliskan pendapat Anda..."
          />
        </div>

        {/* 4. Tombol Aksi (Seperti Simpan & Batal) */}
        <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button
                type="button" // Penting: type="button" agar tidak submit form
                onClick={onCancel}
                className="bg-white text-gray-700 py-2 px-5 rounded border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition duration-150 ease-in-out shadow-sm text-sm"
            >
                Batal
            </button>
            <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-5 rounded border border-transparent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition duration-150 ease-in-out shadow-sm text-sm"
            >
                Simpan
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonialForm;
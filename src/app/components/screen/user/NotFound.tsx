'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { FaExclamationTriangle } from 'react-icons/fa';
import type { FC } from 'react';

const SearchNotFoundPage: FC = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (!search) return;
    window.location.href = `/${search}`;
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center pt-24 px-4">
      <div className="fixed inset-0 bg-black opacity-50 -z-10" />

      <div className="w-full flex justify-center fixed top-10 z-10 px-4">
        <div className="bg-white w-full max-w-xl px-5 py-3.5 rounded-2xl flex items-center shadow-lg">
          <input
            type="text"
            placeholder="Cari ulang permohonan..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="w-full h-full bg-transparent border-none focus:outline-none text-black text-base"
          />

          <button onClick={handleSearch} className="text-gray-500 hover:text-black">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="mt-40 flex flex-col items-center justify-center text-center px-4">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6" />

        <h1 className="text-2xl font-bold text-red-600 mb-3">Surat Tidak Ditemukan</h1>

        <p className="text-gray-700 mb-6 max-w-md">
          Nomor resi yang Anda masukkan tidak ditemukan. Pastikan Anda memasukkan nomor resi dengan benar atau hubungi pihak desa untuk bantuan lebih lanjut.
        </p>

        <button
          onClick={() => window.history.back()}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default SearchNotFoundPage;

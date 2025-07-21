"use client";

import React from "react";

const LayananSection = () => {
  return (
    <section className="relative w-full bg-[#34518D] py-20 overflow-hidden">
      {/* 🔵 Dekorasi Shape Kiri Atas */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#008266] opacity-40 rounded-full blur-3xl z-0" />

      {/* 🔵 Dekorasi Shape Kanan Bawah */}
      <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-indigo-500 opacity-30 rounded-full blur-3xl z-0" />

      {/* 🔵 Dekorasi Shape Tengah */}
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-cyan-300 opacity-20 rounded-full blur-2xl z-0" />

      {/* ✅ Main Konten */}
      <div className="relative z-10 w-full px-6 md:px-20 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Kiri: Teks */}
        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Layanan Cepat Desa Wringinanom
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Kami menyediakan layanan administrasi kependudukan dan pengaduan
            masyarakat secara cepat, mudah, dan efisien untuk seluruh warga Desa
            Wringinanom.
          </p>
        </div>

        {/* Kanan: Card */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <img
              src="/png/bg-home.png"
              alt="Layanan"
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#34518D] mb-3">
                Administrasi Kependudukan
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Pengurusan dokumen kependudukan seperti KTP, KK, surat pindah,
                akta kelahiran, dan dokumen administratif lainnya yang dibutuhkan
                warga Desa Wringinanom.
              </p>
              <a
                href="/surat"
                className="inline-block px-5 py-2 rounded-full bg-[#008266] text-white text-sm font-medium hover:bg-green-700 transition"
              >
                Mulai Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayananSection;

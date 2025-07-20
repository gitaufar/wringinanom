"use client";

import React from 'react'
import LayananCard from '../card/LayananCard';

const LayananSection = () => {
  return (
    <section className='gap-12 flex flex-col items-center bg-[#34518D] pt-12 pb-14 px-4'>
        <h1 className='text-white text-6xl font-bold text-center'>Layanan Cepat Desa Wringinanom</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
            {/* Tambahkan href="/surat" di sini */}
            <LayananCard 
                description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' 
                title='Administrasi Kependudukan' 
                imageUrl='/png/bg-home.png' 
                href="/surat" 
            />
            {/* Untuk kartu kedua, href bisa diarahkan ke '#' atau halaman lain jika ada */}
            <LayananCard 
                description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' 
                title='Pengaduan Masyarakat' 
                imageUrl='/png/bg-home.png' 
                href="#" 
            />
        </div>
    </section>
  )
}

export default LayananSection;
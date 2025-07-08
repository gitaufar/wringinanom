"use client";
import React from 'react'
import LayananCard from '../card/LayananCard';

const LayananSection = () => {
  return (
    <section className='gap-12 flex flex-col items-center bg-[#34518D] pt-12 pb-14 px-14'>
        <h1 className='text-white text-6xl font-bold'>Layanan Cepat Desa Wringinanom</h1>
        <div className='grid grid-cols-2 gap-5'>
            <LayananCard description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' title='Administrasi Kependudukan' imageUrl='/png/bg-home.png' onClick={() => {}}/>
            <LayananCard description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' title='Pengaduan Masyarakat' imageUrl='/png/bg-home.png' onClick={() => {}}/>
        </div>
    </section>
  )
}

export default LayananSection
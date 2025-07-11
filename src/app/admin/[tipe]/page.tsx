"use client";

import React from 'react'
import Dashboard from '../../components/screen/admin/Dashboard';
import { Kependudukan } from '@/app/components/screen/admin/Kependudukan';

type Params = {
  params: {
    tipe: string;
  };
};

const page = ({ params }: Params) => {
  const { tipe } = params;
  return (
    <main className='w-screen h-screen bg-red-900'>
      if(tipe === 'dashboard') {
        <h1 className='text-white text-2xl'>Admin Dashboard</h1>
      } else if(tipe === 'kependudukan') {
        <Kependudukan />
      } else if(tipe === 'administrasi') {
        <h1 className='text-white text-2xl'>Unknown Type</h1>
      } else {
        <h1 className='text-white text-2xl'>Invalid Type</h1>
      }
    </main>
  )
}

export default page
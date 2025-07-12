"use client";

import React from 'react'
import ButtonLogout from '../components/button/ButtonLogout'
import Dashboard from '../components/screen/admin/Dashboard';
import { TambahPenduduk } from '../components/screen/admin/TambahPenduduk';

const page = () => {
  return (
    <div className='w-screen h-screen bg-red-900'>
      <TambahPenduduk />
      </div>
  )
}

export default page
"use client";

import React from 'react'
import ButtonLogout from '../components/button/ButtonLogout'
import Dashboard from '../components/screen/admin/Dashboard';

const page = () => {
  return (
    <div className='w-screen h-screen bg-red-900'>
      <Dashboard />
      <ButtonLogout/>
      </div>
  )
}

export default page
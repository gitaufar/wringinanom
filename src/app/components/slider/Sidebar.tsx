// section/slider/Sidebar.tsx
'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Menu {
  label: string
  path: string
}

const menus: Menu[] = [
  { label: 'Dashboard',     path: '/admin/dashboard' },
  { label: 'Notifikasi',    path: '/admin/notifikasi' },
  { label: 'Administrasi',  path: '/admin/administrasi' },
  { label: 'Laporan',       path: '/admin/laporan' },
  { label: 'Kependudukan',  path: '/admin/kependudukan' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen flex flex-col p-6 justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          Dash<span className="text-black">Stack</span>
        </h1>
        <nav className="space-y-2">
          {menus.map((menu) => {
            const active = pathname === menu.path
            return (
              <Link
                key={menu.path}
                href={menu.path}
                className={
                  `block px-4 py-3 rounded-md text-center transition ` +
                  (active
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100')
                }
              >
                {menu.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <button className="text-red-500 text-sm hover:underline">
        Logout
      </button>
    </aside>
  )
}
// section/slider/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

interface Menu {
  label: string;
  path: string;
}

const menus: Menu[] = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Administrasi', path: '/admin/administrasi' },
  { label: 'Kependudukan', path: '/admin/kependudukan' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen flex flex-col p-6 pt-6 fixed inset-0 justify-between">
      <div>
        {/* ✅ Logo MMD dan FILKOM di atas menu */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Image
            src="/png/Logo_MMD_Filkom_46.png"
            alt="Logo MMD"
            width={35}
            height={35}
            className="object-contain"
          />
          <Image
            src="/png/Logo_Filkom.png"
            alt="Logo Filkom"
            width={110}
            height={110}
            className="object-contain"
          />
        </div>

        <nav className="space-y-2 mt-4">
          {menus.map((menu) => {
            const active = pathname === menu.path;
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
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

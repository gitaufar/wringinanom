"use client";

import ButtonLogout from "@/app/components/button/ButtonLogout";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation"; // untuk styling aktif (client side)

// Menu navigasi
const menus = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Administrasi", value: "administrasi" },
  { label: "Laporan", value: "laporan" },
  { label: "Kependudukan", value: "kependudukan" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Jalankan usePathname di dalam komponen client
  return (
    <div className="flex flex-row bg-[#F5F6FA] min-h-screen">
      {/* Navbar */}
      <nav className="bg-white fixed top-0 w-screen px-10 py-2 flex justify-end z-10">
        <ButtonLogout />
      </nav>

      {/* Sidebar */}
      <aside className="w-1/5 bg-white min-h-screen pt-16 pb-10 flex flex-col items-center justify-between">
        <div className="w-full flex flex-col gap-4">
          {menus.map((menu) => (
            <Link key={menu.value} href={`/admin/${menu.value}`}>
              <div className="flex justify-center px-6 w-full">
                <div className={`text-base rounded-md py-4 w-full text-center cursor-pointer transition
                  hover:bg-[#4880FF] hover:text-white`}>
                  {menu.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* Konten Halaman */}
      <section className="flex-1 pt-[55px] px-6">
        {children}
      </section>
    </div>
  );
}

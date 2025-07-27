"use client";

import ButtonLogout from "@/app/components/button/ButtonLogout";
import { ReactNode } from "react";
import Sidebar from "@/app/components/slider/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  // Jalankan usePathname di dalam komponen client
  return (
    <div className="flex flex-row pl-64 bg-[#F5F6FA] min-h-screen">
      {/* Navbar */}
      <nav className="bg-white fixed top-0 w-screen px-10 py-2 flex justify-end z-10">
        <ButtonLogout />
      </nav>

      <Sidebar />

      {/* Konten Halaman */}
      <section className="flex-1 pt-[55px] px-6">{children}</section>
    </div>
  );
}

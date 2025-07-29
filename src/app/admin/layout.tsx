"use client";

import { ReactNode } from "react";
import Sidebar from "@/app/components/slider/Sidebar";
import { PendudukProvider } from "../components/context/PendudukContext";
import { RiwayatProvider } from "../components/context/RiwayatLayananContext";
import { PermohonanProvider } from "../components/context/PermohonanContext";
import ButtonLogout from "../components/button/ButtonLogout";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <PendudukProvider>
      <RiwayatProvider>
        <PermohonanProvider>
          <div className="flex flex-row pl-64 bg-[#F5F6FA] min-h-screen">
            {/* Navbar */}
            <nav className="bg-white fixed top-0 left-0 right-0 ml-64 h-[55px] px-10 py-2 flex justify-end items-center z-10 shadow-sm">
              <ButtonLogout />
            </nav>

            <Sidebar />

            {/* Konten Halaman */}
            <section className="flex-1 pt-[55px] px-6">{children}</section>
          </div>
        </PermohonanProvider>
      </RiwayatProvider>
    </PendudukProvider>
  );
}

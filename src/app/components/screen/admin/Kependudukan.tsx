"use client";

import TabelKependudukan from "../../../components/tabel/TabelKependudukan";
import ButtonTambahPenduduk from "../../../components/button/ButtonTambahPenduduk";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import { Search as SearchIcon } from "lucide-react";
import { usePenduduk } from "../../context/PendudukContext";

export default function KependudukanPage(): JSX.Element {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = usePenduduk();

  const handleSearch = () => {
    console.log("Cari dari context:", searchTerm);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Kependudukan</h1>

      {/* Tombol + Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm gap-4">

        {/* Search Bar */}
        <div className="w-full sm:w-auto sm:flex-1 max-w-md">
          <div className="flex items-center bg-white rounded-md px-5 py-2.5 border border-gray-300 h-[42px]">
            <input
              type="text"
              placeholder="Cari penduduk..."
              className="flex-grow text-sm sm:text-base text-gray-800 bg-transparent border-none focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <SearchIcon className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Tombol Tambah Penduduk */}
        <ButtonTambahPenduduk
          onClick={() => router.push("/admin/kependudukan/tambah")}
        />
      </div>

      {/* Data Penduduk */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Data Penduduk</h2>
        <TabelKependudukan />
      </section>
    </div>
  );
}

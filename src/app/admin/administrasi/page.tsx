"use client";

import React, { JSX, useState } from "react";
import FilterPenduduk from "../../components/filter/FilterPenduduk";
import TabelPermohonan from "../../components/tabel/TabelPermohonan";
import TabelRiwayatPermohonan from "@/app/components/tabel/TabelRiwayatPermohonan";
import Image from "next/image";
import { Search } from "lucide-react";

const AdminPage = (): JSX.Element => {
  const [search, setSearch] = useState("");
  const [change, setChange] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-[#f7f8fc] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white w-full max-w-xl h-fit px-5 py-3.5 rounded-2xl justify-between flex flex-row items-center">
            <input
              type="text"
              placeholder="Cari permohonan..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="w-full h-full bg-transparent border-none focus:outline-none text-black text-base"
            />
            <Search className="text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mt-8 mb-4">Administrasi</h1>

        {/* Filter */}
        <FilterPenduduk />

        {/* Tabel Permohonan */}
        <TabelPermohonan
          search={search}
          setChange={setChange}
          change={change}
        />

        {/* Title for History Table */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Riwayat Permohonan</h2>

        {/* Tabel Riwayat Permohonan */}
        <TabelRiwayatPermohonan change={change} />
      </div>
    </div>
  );
};

export default AdminPage;

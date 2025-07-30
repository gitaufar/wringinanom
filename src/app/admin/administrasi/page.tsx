"use client";

import React, { JSX, useState } from "react";
import FilterPenduduk from "../../components/filter/FilterPenduduk";
import TabelPermohonan from "../../components/tabel/TabelPermohonan";
import TabelRiwayatPermohonan from "@/app/components/tabel/TabelRiwayatPermohonan";
import { Search } from "lucide-react";

const AdminPage = (): JSX.Element => {
  const [search, setSearch] = useState("");
  const [change, setChange] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-[#f7f8fc] p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold mt-8 mb-4">Administrasi</h1>

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

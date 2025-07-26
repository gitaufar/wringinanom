"use client";

import React from "react";

interface InputFieldTimeProps {
  inputLabel: string;
  data: string;
  setData: (val: string) => void;
  editData: boolean;
  setEditData: (val: boolean) => void;
  submited: string | null;
  error?: string; // BARU: Tambahkan prop untuk pesan error
}

export default function InputFieldTime({
  inputLabel,
  data,
  setData,
  editData,
  error, // BARU: Ambil prop error dari props
}: InputFieldTimeProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-base font-medium text-black">{inputLabel}</label>
      <input
        type="time"
        // DIUBAH: Logika className sekarang bergantung pada prop 'error'
        className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-500" // Style saat ada error
            : "border-gray-300 focus:ring-blue-500" // Style normal
        }`}
        value={data}
        onChange={(e) => setData(e.target.value)}
        disabled={!editData}
        placeholder="00:00"
        step="60" // Menampilkan menit saja, tanpa detik
      />
      {/* DIUBAH: Tampilkan pesan error dari prop 'error' */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
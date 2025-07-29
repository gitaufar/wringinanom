"use client";

import { FaFilter, FaRedo } from "react-icons/fa";
import React, { JSX } from "react";

const FilterPenduduk = (): JSX.Element => {
  return (
    <div className="flex items-center bg-white rounded-xl px-4 py-2 gap-4 overflow-x-auto border border-gray-200">
      {/* Filter Icon & Label */}
      <div className="flex items-center gap-2 pr-4 border-r border-gray-300">
        <FaFilter className="text-lg text-gray-600" />
        <span className="font-medium text-sm text-gray-700">Urutkan</span>
      </div>

      {/* Dropdown Waktu */}
      <DropdownSelect label="Waktu" options={["Waktu"]} name="waktu" />

      {/* Dropdown Jenis Surat */}
      <DropdownSelect
        label="Jenis Surat"
        options={["Surat Beda Identitas", "Surat Domisili", "Surat Kehilangan"]}
        name="jenis"
      />

      {/* Dropdown Status */}
      <DropdownSelect
        label="Status"
        options={["Selesai", "Diproses", "Dibatalkan"]}
        name="status"
      />

      {/* Reset Button */}
      <button className="flex items-center gap-2 text-red-500 ml-auto text-sm font-medium hover:underline">
        <FaRedo size={14} />
        Reset Urutan
      </button>
    </div>
  );
};

// Reusable dropdown select
interface DropdownSelectProps {
  label: string;
  options: string[];
  name: string;
}

const DropdownSelect = ({ label, options, name }: DropdownSelectProps): JSX.Element => {
  return (
    <div className="relative">
      <select
  name={name}
  className="appearance-none min-w-[180px] bg-white px-4 py-2 text-sm font-medium border border-gray-300 rounded-md pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
>
  <option value="" disabled hidden>
    {label}
  </option>
  {options.map((opt, idx) => (
    <option key={idx} value={opt}>
      {opt}
    </option>
  ))}
</select>

    </div>
  );
};

export default FilterPenduduk;

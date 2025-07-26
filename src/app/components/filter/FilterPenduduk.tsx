"use client";

import { FaFilter, FaRedo } from "react-icons/fa";

const FilterPenduduk = () => {
  return (
    <div className="flex items-center bg-white border rounded-xl px-4 py-2 gap-4 overflow-x-auto">
      {/* Filter Icon & Label */}
      <div className="flex items-center gap-2 pr-4 border-r">
        <FaFilter className="text-xl" />
        <span className="font-semibold text-sm">Urutkan</span>
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
        options={['Selesai', 'Diproses', 'Dibatalkan']}
        name="status"
      />

      {/* Reset Button */}
      <button className="flex items-center gap-2 text-red-500 ml-auto text-sm font-medium">
        <FaRedo size={14} />
        Reset Urutan
      </button>
    </div>
  );
};

// Reusable dropdown select
const DropdownSelect = ({
  label,
  options,
  name,
}: {
  label: string;
  options: string[];
  name: string;
}) => {
  return (
    <div className="relative">
      <select
        name={name}
        className="appearance-none min-w-25 bg-white px-4 py-2 text-sm font-semibold border border-gray-200 rounded-md pr-8 text-black focus:outline-none"
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

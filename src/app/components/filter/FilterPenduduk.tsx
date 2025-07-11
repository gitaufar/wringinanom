"use client";
import { FaFilter, FaRedo } from "react-icons/fa";

const FilterPenduduk = () => {
  return (
    <div className="flex flex-wrap items-center gap-8 bg-white border rounded-xl px-4 py-3">
      <div className="flex items-center gap-2 pr-4 border-r">
        <FaFilter />
        <span className="font-medium">Urutkan</span>
      </div>
      <select className="appearance-none px-3 py-1 border rounded-md bg-white">
  <option>Waktu</option>
</select>
<select className="appearance-none px-3 py-1 border rounded-md bg-white">
  <option>Jenis Surat</option>
</select>
<select className="appearance-none px-3 py-1 border rounded-md bg-white">
  <option>Status Order</option>
</select>

      <button className="flex items-center gap-1 text-red-500 ml-auto">
        <FaRedo /> <span>Reset Urutan</span>
      </button>
    </div>
  );
};

export default FilterPenduduk;

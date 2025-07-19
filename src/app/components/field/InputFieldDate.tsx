// app/components/field/InputFieldDate.tsx (Updated)

"use client";

import { PencilIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react"; // Import Dispatch dan SetStateAction

type InputFieldDateProps = {
  inputLabel?: string;
  setData: (value: string) => void;
  setEditData: Dispatch<SetStateAction<boolean>>; // Menggunakan tipe yang lebih spesifik
  editData: boolean;
  submited?: string | null;
  data?: string;
};

export default function InputFieldDate({
  inputLabel,
  setData,
  setEditData,
  editData,
  submited,
  data = "",
}: InputFieldDateProps) {
  
  // Fungsi ini akan dipanggil saat tombol Simpan/Edit diklik
  const handleToggleEdit = () => {
    // Jika sedang dalam mode edit dan input kosong, jangan biarkan 'Simpan'
    if (editData && !data) {
      alert("Harap isi tanggal terlebih dahulu.");
      return;
    }
    setEditData(!editData);
  };

  return (
    <div className="flex flex-col gap-2">
      {inputLabel && (
        <label className="text-sm sm:text-base font-normal text-neutral-600">
          {inputLabel}
        </label>
      )}
      {/* MENGGUNAKAN FLEXBOX UNTUK LAYOUT YANG LEBIH BAIK */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={!editData}
          // Input akan mengisi ruang yang tersedia
          className={`flex-1 w-full text-xs ${
            data === "" ? "text-neutral-400" : "text-black"
          } sm:text-base font-normal border ${
            editData
              ? "bg-transparent border-gray-300"
              // Saat tidak bisa diedit, beri tampilan yang lebih jelas
              : "bg-gray-100 border-gray-100 text-gray-700"
          } px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {/*
          LOGIKA DIPERBAIKI: Tombol hanya muncul setelah form pernah disubmit.
          Gunakan 'button' dengan 'type="button"' di dalam form.
        */}
        {submited === "submit" && (
          <button
            type="button"
            onClick={handleToggleEdit}
            className="flex-shrink-0 cursor-pointer flex items-center bg-neutral-200 hover:bg-neutral-300 gap-x-2 px-3 py-2 rounded-md transition-colors"
          >
            <p className="text-xs font-medium text-gray-600">
              {editData ? "Simpan" : "Ubah"}
            </p>
            <PencilIcon width={14} height={14} className="text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { TambahPendudukForm } from "../../form/TambahPendudukForm";
import { Spinner } from "flowbite-react";

export type PendudukProps = {
  nik: string;
  no_kk: string;
  nama_lengkap?: string;
  nama_ibu?: string;
  nama_ayah?: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  pendidikan: string;
  pekerjaan?: string;
  golongan_darah: string;
  status_perkawinan: string;
  tanggal_perkawinan?: string;
  status_keluarga: string;
  alamat: string;
  rt: string;
  rw: string;
};

const defaultForm: PendudukProps = {
  nik: "",
  no_kk: "",
  nama_lengkap: "",
  nama_ibu: "",
  nama_ayah: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  agama: "",
  pendidikan: "",
  pekerjaan: "",
  golongan_darah: "",
  status_perkawinan: "",
  tanggal_perkawinan: "",
  status_keluarga: "",
  alamat: "",
  rt: "",
  rw: "",
};

export const TambahPenduduk = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PendudukProps>(defaultForm);

  const [editStates, setEditStates] = useState<{
    [K in keyof PendudukProps]: boolean;
  }>(
    Object.fromEntries(Object.keys(defaultForm).map((key) => [key, true])) as {
      [K in keyof PendudukProps]: boolean;
    }
  );

  const handleChange = (field: keyof PendudukProps, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleEdit = (field: keyof PendudukProps) => {
    setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/penduduk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Gagal mengirim data");

    const result = await res.json();
    resetForm();
    alert("Data berhasil dikirim!");
    console.log("✅ Data terkirim:", result);
    window.location.href = "/admin/kependudukan";
  } catch (err) {
    console.error("❌ Gagal mengirim:", err);
    alert("Gagal mengirim data!");
  } finally {
    setLoading(false);
  }
};

  const resetForm = () => {
    setFormData(defaultForm);
    setEditStates(
      Object.fromEntries(
        Object.keys(defaultForm).map((key) => [key, true])
      ) as {
        [K in keyof PendudukProps]: boolean;
      }
    );
  };

  return (
    <main className="min-h-full w-full bg-[#F5F6FA] px-7 pb-10 pt-5 flex flex-col gap-6 relative">
      <h1 className="text-black font-bold text-3xl">Tambah Penduduk</h1>

      <TambahPendudukForm
        formData={formData}
        editStates={editStates}
        onChange={handleChange}
        onToggleEdit={handleToggleEdit}
      />

      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <button
          onClick={onSubmit}
          className="bg-[#4880FF] rounded-2xl flex items-center justify-center gap-2 py-3 px-12 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <p className="text-white font-bold text-xl">Tambah</p>
          )}
        </button>
      </div>
    </main>
  );
};

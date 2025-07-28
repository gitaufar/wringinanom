"use client";

import React, { JSX, useState } from "react";
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
  status_perkawinan: "",
  tanggal_perkawinan: "",
  status_keluarga: "",
  alamat: "",
  rt: "",
  rw: "",
};

type TambahPendudukProps = {
  formDataProps?: PendudukProps;
};

// ✅ Perbaikan: tidak perlu assertion `as string`
const sanitizeFormData = (data: PendudukProps | undefined): PendudukProps => {
  if (!data) return defaultForm;

  const sanitized = { ...data };
  (Object.keys(sanitized) as Array<keyof PendudukProps>).forEach((key) => {
    const value = sanitized[key];
    sanitized[key] = value ?? "";
  });

  return sanitized;
};

export const TambahPenduduk = ({
  formDataProps,
}: TambahPendudukProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PendudukProps>(
    sanitizeFormData(formDataProps)
  );

  const [editStates, setEditStates] = useState<Record<keyof PendudukProps, boolean>>(
    Object.fromEntries(
      Object.keys(defaultForm).map((key) => [key, formDataProps ? false : true])
    ) as Record<keyof PendudukProps, boolean>
  );

  const [submitStates] = useState<Record<keyof PendudukProps, string | null>>(
    Object.fromEntries(
      Object.keys(defaultForm).map((key) => [key, formDataProps ? null : ""])
    ) as Record<keyof PendudukProps, string | null>
  );

  const handleChange = (field: keyof PendudukProps, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleEdit = (field: keyof PendudukProps) => {
    setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("/api/penduduk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal mengirim data");

      const result: unknown = await res.json(); // ✅ Hindari `any`
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

  const resetForm = (): void => {
    setFormData(defaultForm);
    setEditStates(
      Object.fromEntries(
        Object.keys(defaultForm).map((key) => [key, true])
      ) as Record<keyof PendudukProps, boolean>
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
        submitStates={submitStates}
      />

      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <button
          onClick={() => void onSubmit()}
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

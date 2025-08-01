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

// Type for API response
type ApiResponse = {
  message?: string;
  error?: string;
  data?: unknown;
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
  isEdit?: boolean;
};

const sanitizeFormData = (data: PendudukProps | undefined): PendudukProps => {
  if (!data) return defaultForm;

  const sanitized = { ...data };
  (Object.keys(sanitized) as Array<keyof PendudukProps>).forEach((key) => {
    sanitized[key] = sanitized[key] ?? "";
  });

  return sanitized;
};

export const TambahPenduduk = ({
  formDataProps,
  isEdit = false,
}: TambahPendudukProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PendudukProps>(
    sanitizeFormData(formDataProps)
  );
  const [showNikExistsModal, setShowNikExistsModal] = useState(false);

  const [editStates, setEditStates] = useState<
    Record<keyof PendudukProps, boolean>
  >(
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
      const endpoint = isEdit
        ? `/api/penduduk/${formData.nik}`
        : "/api/penduduk";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Type the response properly
      const result: ApiResponse = await res.json() as ApiResponse;

      if (!res.ok) {
        if (res.status === 409 && result.message && result.message.includes("sudah ada")) {
          setShowNikExistsModal(true);
        } else {
          throw new Error(result.error || "Gagal mengirim data");
        }
        return;
      }

      resetForm();
      alert(
        isEdit ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!"
      );
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
      <h1 className="text-black font-bold text-3xl">
        {isEdit ? "Edit Penduduk" : "Tambah Penduduk"}
      </h1>

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
            <p className="text-white font-bold text-xl">
              {isEdit ? "Simpan Perubahan" : "Tambah"}
            </p>
          )}
        </button>
      </div>

      {showNikExistsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Data Sudah Ada</h2>
            <p className="text-sm mb-4">
              Penduduk dengan NIK tersebut sudah terdaftar.
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => setShowNikExistsModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
"use client";

import InputField from "./../../components/field/InputField";
import InputFieldDate from "./../../components/field/InputFieldDate";
import InputFieldDropdown from "./../../components/field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState } from "react";
import type { ReactNode } from "react"; 

type SuratKeteranganBedaIdentitasProps = {
  tipe: string;
};

type FormErrors = {
  [key: string]: string | undefined;
};


type ApiResponse = {
  permohonan: {
    no_resi: string;
  };
  error?: string; 
};

export default function SuratKeteranganBedaIdentitas({
  tipe,
}: SuratKeteranganBedaIdentitasProps): ReactNode { 
  const initialState = {
    namaPengaju: "",
    nikPengaju: "",
    namaLama: "",
    namaBaru: "",
    nikAnak: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    agama: "",
    pekerjaan: "",
    kewarganegaraan: "",
  };

  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const [form, setForm] = useState(initialState);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    field: keyof typeof initialState,
    value: string
  ): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    Object.keys(form).forEach((keyStr) => {
      const key = keyStr as keyof typeof initialState;
      if (!form[key] || !form[key].trim()) {
        const fieldName = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        newErrors[key] = `${fieldName} wajib diisi.`;
      }
    });
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent): void => { 
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }
    setErrors({}); 
    setShowConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => { 
    try {
      setSubmited("");
      setLoading(true);

      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: form.nikPengaju,
          jenis_surat: "Beda Identitas",
          tipe,
          keterangan: `Permohonan Surat Beda Identitas oleh ${form.namaPengaju}`,
          data_dinamis: {
            namaLama: form.namaLama,
            namaSekarang: form.namaBaru,
            nik: form.nikAnak,
            kota: form.kotaLahir,
            tanggalLahir: form.tanggalLahir,
            jenisKelamin: form.jenisKelamin,
            alamat: form.alamat,
            agama: form.agama,
            pekerjaan: form.pekerjaan,
            negara: form.kewarganegaraan,
          },
        }),
      });

      // DIUBAH: Menggunakan type assertion 'as' untuk memberi tipe pada hasil .json()
      const result = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

      window.location.href = `/${result.permohonan.no_resi}`;
    } catch (err) {
      if (err instanceof Error) {
        setErrorInfo(`Terjadi kesalahan: ${err.message}`);
      } else {
        setErrorInfo("Terjadi kesalahan yang tidak diketahui.");
      }
      setEdit(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (): void => { 
    setForm(initialState);
    setErrors({});
    setEdit(true);
    setSubmited("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header */}
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>

      <div className="w-full pt-24 px-5 lg:px-[170px]">
        {/* Judul Tengah */}
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN BEDA IDENTITAS
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8"
        >
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama Pengaju</h2>
            <InputField
              inputLabel="Nama Pengaju"
              inputPlaceholder="Nama Pengaju"
              data={form.namaPengaju}
              setData={(val) => handleInputChange("namaPengaju", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.namaPengaju}
            />
            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={form.nikPengaju}
              setData={(val) => handleInputChange("nikPengaju", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              numberOnly
              error={errors.nikPengaju}
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Identitas</h2>
            <InputField
              inputLabel="Nama Lama"
              inputPlaceholder="Nama Lama"
              data={form.namaLama}
              setData={(val) => handleInputChange("namaLama", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.namaLama}
            />
            <InputField
              inputLabel="Nama Baru"
              inputPlaceholder="Nama Baru"
              data={form.namaBaru}
              setData={(val) => handleInputChange("namaBaru", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.namaBaru}
            />
            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={form.nikAnak}
              setData={(val) => handleInputChange("nikAnak", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              numberOnly
              error={errors.nikAnak}
            />
            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten"
              data={form.kotaLahir}
              setData={(val) => handleInputChange("kotaLahir", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.kotaLahir}
            />
            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={form.tanggalLahir}
              setData={(val) => handleInputChange("tanggalLahir", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.tanggalLahir}
            />
            <InputFieldDropdown
              inputLabel="Jenis Kelamin"
              options={["Laki-laki", "Perempuan"]}
              data={form.jenisKelamin}
              setData={(val) => handleInputChange("jenisKelamin", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.jenisKelamin}
            />
            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Alamat"
              data={form.alamat}
              setData={(val) => handleInputChange("alamat", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.alamat}
            />
            <InputFieldDropdown
              inputLabel="Agama"
              options={[
                "Islam",
                "Kristen",
                "Katolik",
                "Hindu",
                "Buddha",
                "Konghucu",
              ]}
              data={form.agama}
              setData={(val) => handleInputChange("agama", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.agama}
            />
            <InputField
              inputLabel="Pekerjaan"
              inputPlaceholder="Pekerjaan"
              data={form.pekerjaan}
              setData={(val) => handleInputChange("pekerjaan", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.pekerjaan}
            />
            <InputField
              inputLabel="Kewarganegaraan"
              inputPlaceholder="Kewarganegaraan"
              data={form.kewarganegaraan}
              setData={(val) => handleInputChange("kewarganegaraan", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.kewarganegaraan}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal || errorInfo !== null}
        onClose={() => {
          setShowConfirmModal(false);
          setErrorInfo(null);
        }}
        onConfirm={() => {
          void handleConfirm();
        }}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
      />
    </div>
  );
}

"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState } from "react";
import type { ReactNode } from "react"; 

type SuratPengantarProps = {
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

export default function SuratPengantar({ tipe }: SuratPengantarProps): ReactNode {
  
  const initialData = {
    namaLengkap: "",
    kotaLahir: "",
    tanggalLahir: "",
    nik: "",
    nomorKK: "",
    jenisKelamin: "",
    agama: "",
    statusPerkawinan: "",
    pekerjaan: "",
    alamat: "",
    pengajuan: "",
    tujuanPengajuan: "",
  };
  
  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  
   const handleInputChange = (field: keyof typeof initialData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

   const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((keyStr) => {
      const key = keyStr as keyof typeof initialData;
      if (!formData[key]?.trim()) {
        const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
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
    setLoading(true);
    setEditData(false);

    const data_dinamis = {
      nama: formData.namaLengkap,
      kota: formData.kotaLahir,
      tanggalLahir: formData.tanggalLahir,
      nik: formData.nik,
      noKK: formData.nomorKK,
      jenisKelamin: formData.jenisKelamin,
      agama: formData.agama,
      statusPerkawinan: formData.statusPerkawinan,
      pekerjaan: formData.pekerjaan,
      alamat: formData.alamat,
      pengajuan: formData.pengajuan,
      tujuan: formData.tujuanPengajuan,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.nik,
          jenis_surat: "pengantar",
          tipe: tipe,
          keterangan: `Pengajuan Surat Pengantar oleh ${formData.namaLengkap} untuk keperluan ${formData.pengajuan}`,
          data_dinamis,
        }),
      });

      const result = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

      window.location.href = `/${result.permohonan.no_resi}`;

    } catch (err) {
      if (err instanceof Error) {
        setErrorInfo(`Terjadi kesalahan: ${err.message}`);
      } else {
        setErrorInfo("Terjadi kesalahan yang tidak diketahui.");
      }
      setEditData(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setEditData(true);
    setSubmited("");
  };

  
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
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

      {/* Content */}
      <div className="w-full pt-24 px-4 md:px-8 lg:px-[170px]">
        {/* Judul & Subjudul */}
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT PENGANTAR
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8"
        >
          {/* DIUBAH: Semua input disesuaikan dengan sistem validasi */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.namaLengkap} setData={(val) => handleInputChange("namaLengkap", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaLengkap} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={formData.kotaLahir} setData={(val) => handleInputChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalLahir} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nik} setData={(val) => handleInputChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nik} />
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor KK" data={formData.nomorKK} setData={(val) => handleInputChange("nomorKK", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nomorKK} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jenisKelamin} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Khonghucu"]} data={formData.agama} setData={(val) => handleInputChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.agama} />
            <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Kawin", "Kawin"]} data={formData.statusPerkawinan} setData={(val) => handleInputChange("statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.statusPerkawinan} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaan} setData={(val) => handleInputChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pekerjaan} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamat} setData={(val) => handleInputChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamat} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Pengajuan</h2>
            <InputField inputLabel="Pengajuan" inputPlaceholder="Contoh: Mengajukan pembuatan KTP" data={formData.pengajuan} setData={(val) => handleInputChange("pengajuan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengajuan} />
            <InputField inputLabel="Tujuan Pengajuan" inputPlaceholder="Contoh: Untuk keperluan administrasi kependudukan" data={formData.tujuanPengajuan} setData={(val) => handleInputChange("tujuanPengajuan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tujuanPengajuan} />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">Submit</button>
            <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">Reset</button>
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

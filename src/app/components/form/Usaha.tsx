"use client";


import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState } from "react";
import type { ReactNode } from "react"; 

type UsahaProps = {
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

export default function Usaha({ tipe }: UsahaProps): ReactNode {
  const initialData = {
  no_wa:"",
  namaPengaju: "",
  kotaLahir: "",
  tanggalLahir: "",
  nik: "",
  jenisKelamin: "",
  agama: "",
  alamat: "",
  statusPerkawinan: "",
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

const handleConfirm = async (): Promise<void>=> {
    setLoading(true);
    setEditData(false);

    const data_dinamis = {
      nama: formData.namaPengaju,
      kota: formData.kotaLahir,
      tanggalLahir: formData.tanggalLahir,
      nik: formData.nik,
      jenisKelamin: formData.jenisKelamin,
      agama: formData.agama,
      statusPerkawinan: formData.statusPerkawinan,
      alamat: formData.alamat,
    };
    console.log("DATA YANG DIKIRIM KE BACKEND:", data_dinamis);
    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_wa: formData.no_wa,
          nik: formData.nik,
          jenis_surat: "Surat Keterangan Usaha",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Usaha oleh ${formData.namaPengaju}`,
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
    setSubmited("");
    setEditData(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Header */}
<div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
  {/* Tombol Back */}
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

  {/* Avatar & Judul */}
  <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
  <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
    Pengajuan Surat
  </div>
</div>


      {/* Main Content */}
      <div className="w-full pt-20">
        {/* Header */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] py-8 md:py-[60px]">
          <div className="flex flex-col items-center gap-6 flex-1">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN USAHA
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            {/* DIUBAH: Semua input disesuaikan dengan state baru dan sistem validasi */}
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Diri Pengaju
            </h1>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={formData.namaPengaju} setData={(val) => handleInputChange("namaPengaju", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaPengaju} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nik} setData={(val) => handleInputChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nik} />
            <InputField inputLabel="Nomor WA" inputPlaceholder="No. WA Pengaju" data={formData.no_wa} setData={(val) => handleInputChange("no_wa", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.no_wa} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.kotaLahir} setData={(val) => handleInputChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jenisKelamin} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Hindu", "Buddha", "Konghucu"]} data={formData.agama} setData={(val) => handleInputChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.agama} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamat} setData={(val) => handleInputChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamat} />
            <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Menikah", "Menikah"]} data={formData.statusPerkawinan} setData={(val) => handleInputChange("statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.statusPerkawinan} />

            <div className="flex gap-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">
                Reset
              </button>
            </div>
          </form>
        </div>

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

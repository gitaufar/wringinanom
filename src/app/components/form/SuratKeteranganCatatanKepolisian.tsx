"use client";

import { useState } from "react";
import type { ReactNode } from "react"; 
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganCatatanKepolisianProps = {
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

export default function SuratKeteranganCatatanKepolisian({ tipe }: SuratKeteranganCatatanKepolisianProps): ReactNode {
  const initialData = {
    namaLengkap: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    agama: "",
    pekerjaan: "",
    pendidikanTerakhir: "",
    nik: "",
    nomorKK: "",
    alamat: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({}); 

  const handleInputChange = (field: keyof typeof formData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }};
  
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (!value || value.trim() === "") {
        const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        if (key === "jenisKelamin" || key === "statusPerkawinan") {
            newErrors[key] = `${fieldName} harus dipilih.`;
        } else {
            newErrors[key] = `${fieldName} tidak boleh kosong.`;
        }
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
    setSubmited("");
    const data_dinamis = {
      nama: formData.namaLengkap,
      kota: formData.kotaLahir,
      tanggalLahir: formData.tanggalLahir,
      jenisKelamin: formData.jenisKelamin,
      statusPerkawinan: formData.statusPerkawinan,
      agama: formData.agama,
      pekerjaan: formData.pekerjaan,
      pendidikanTerakhir: formData.pendidikanTerakhir,
      noKK: formData.nomorKK,
      alamat: formData.alamat,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.nik,
          jenis_surat: "catatan_kepolisian",
          tipe,
          keterangan: `Pengajuan Surat Keterangan Catatan Kepolisian (SKCK) atas nama ${formData.namaLengkap}`,
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
      setEditData(true); // Izinkan edit kembali jika ada error
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
      {/* Bagian Header tidak berubah */}
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>

      <div className="w-full pt-20">
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] py-8 md:py-[60px]">
          <div className="flex flex-col items-center gap-6 flex-1">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold text-center">
              SURAT KETERANGAN CATATAN KEPOLISIAN (SKCK)
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya. Semua bidang wajib diisi.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px]">
          <form
            onSubmit={handleSubmit}
            noValidate 
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h2 className="text-xl font-bold">Data Pengaju</h2>
            
            {/* DIUBAH: Semua komponen input sekarang menggunakan handleInputChange dan menerima prop 'error' */}
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.namaLengkap} setData={(val) => handleInputChange("namaLengkap", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaLengkap} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.kotaLahir} setData={(val) => handleInputChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jenisKelamin} />
            <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Kawin", "Kawin"]} data={formData.statusPerkawinan} setData={(val) => handleInputChange("statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.statusPerkawinan} />
            <InputField inputLabel="Agama" inputPlaceholder="Agama" data={formData.agama} setData={(val) => handleInputChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.agama} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaan} setData={(val) => handleInputChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pekerjaan} />
            <InputField inputLabel="Pendidikan Terakhir" inputPlaceholder="Pendidikan Terakhir" data={formData.pendidikanTerakhir} setData={(val) => handleInputChange("pendidikanTerakhir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pendidikanTerakhir} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nik} setData={(val) => handleInputChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nik} />
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor KK" data={formData.nomorKK} setData={(val) => handleInputChange("nomorKK", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.nomorKK} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamat} setData={(val) => handleInputChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamat} />


            <div className="flex gap-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium hover:bg-gray-400 transition-colors">
                Reset
              </button>
            </div>
          </form>
        </div>

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
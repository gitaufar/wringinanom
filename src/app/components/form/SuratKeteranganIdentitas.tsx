"use client";

import InputField from "./../../components/field/InputField";
import InputFieldDate from "./../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState } from "react";
import type { ReactNode } from "react";


type SuratKeteranganIdentitasProps = {
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

export default function SuratKeteranganIdentitas({ tipe }: SuratKeteranganIdentitasProps): ReactNode {
  
  const initialState = {
    namaPengaju: "",
    nikPengaju: "",
    
    dokumen1: "", 
    dokumen2: "", 
    agama: "",
    
    // Dokumen 1
    namaDok1: "",
    kotaLahirDok1: "",
    tanggalLahirDok1: "",
    nikDok1: "",
    kkDok1: "",
    jenisKelaminDok1: "",
    alamatDok1: "",
    statusDok1: "",
    
    // Dokumen 2
    namaDok2: "",
    kotaLahirDok2: "",
    tanggalLahirDok2: "",
    nikDok2: "",
    kkDok2: "",
    jenisKelaminDok2: "",
    statusDok2: "",
    alamatDok2: "",
  };
  
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  
  const handleInputChange = (field: keyof typeof initialState, value: string): void => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

 
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    Object.keys(form).forEach(keyStr => {
      const key = keyStr as keyof typeof initialState;
      if (!form[key]?.trim()) {
        const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        newErrors[key] = `${fieldName.replace(/Dok(\d)/, ' Dok $1')} wajib diisi.`;
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
    setEdit(false);

    const data_dinamis = {
      namaDok1: form.namaDok1,
      // Mengambil data umum dari Dokumen 1 (sesuai asumsi)
      kota: form.kotaLahirDok1,
      tanggalLahir: form.tanggalLahirDok1,
      jenisKelamin: form.jenisKelaminDok1,
      agama: form.agama,
      nik: form.nikDok1,
      noKK: form.kkDok1,
      alamat: form.alamatDok1,
      status: form.statusDok1,
      // Mengambil nama dokumen dari field baru
      dok1: form.dokumen1,
      dok2: form.dokumen2,
      // Mengambil nama dari Dokumen 2
      namaDok2: form.namaDok2,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: form.nikPengaju,
          jenis_surat: "identitas",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Identitas oleh ${form.namaPengaju}`,
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
      setEdit(true); // Izinkan edit kembali jika ada error
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    setEdit(true);
    setSubmited(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header */}
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
              SURAT KETERANGAN IDENTITAS
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          {/* Nama Pengaju */}
          <form onSubmit={handleSubmit} noValidate>
            {/* DIUBAH: Semua komponen input sekarang terhubung ke sistem validasi */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Nama Pengaju</h2>
              <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={form.namaPengaju} setData={(val) => handleInputChange("namaPengaju", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.namaPengaju} />
              <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikPengaju} setData={(val) => handleInputChange("nikPengaju", val)} setEditData={setEdit} editData={edit} submited={submited} numberOnly error={errors.nikPengaju} />
            </div>

            <div className="space-y-3 mt-8">
              <h2 className="text-xl font-bold">DOKUMEN 1</h2>
              <InputField inputLabel="Nama" inputPlaceholder="Nama" data={form.namaDok1} setData={(val) => handleInputChange("namaDok1", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.namaDok1} />
              <InputField 
                inputLabel="Nama Dokumen 1" 
                inputPlaceholder="Contoh: KTP" 
                data={form.dokumen1} 
                setData={(val) => handleInputChange("dokumen1", val)} 
                setEditData={setEdit} 
                editData={edit} 
                submited={submited} 
                error={errors.dokumen1} 
              />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahirDok1} setData={(val) => handleInputChange("kotaLahirDok1", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.kotaLahirDok1} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahirDok1} setData={(val) => handleInputChange("tanggalLahirDok1", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.tanggalLahirDok1} />
              <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikDok1} setData={(val) => handleInputChange("nikDok1", val)} setEditData={setEdit} editData={edit} submited={submited} numberOnly error={errors.nikDok1} />
              <InputFieldDropdown
              inputLabel="Agama"
              options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
              data={form.agama}
              setData={(val) => handleInputChange("agama", val)}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              error={errors.agama}
            />
              <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="No KK" data={form.kkDok1} setData={(val) => handleInputChange("kkDok1", val)} setEditData={setEdit} editData={edit} submited={submited} numberOnly error={errors.kkDok1} />
              {/* DIPERBAIKI: Bug pada 'data' dan 'setData' diperbaiki */}
              <InputFieldDropdown inputLabel="Jenis Kelamin" inputPlaceholder="Pilih jenis kelamin" options={["Laki-laki", "Perempuan"]} data={form.jenisKelaminDok1} setData={(val) => handleInputChange("jenisKelaminDok1", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.jenisKelaminDok1} />
              <InputField inputLabel="Alamat" inputPlaceholder="Alamat Lengkap" data={form.alamatDok1} setData={(val) => handleInputChange("alamatDok1", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.alamatDok1} />
              <InputField inputLabel="Status" inputPlaceholder="Contoh: Sudah Menikah / Belum Menikah" data={form.statusDok1} setData={(val) => handleInputChange("statusDok1", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.statusDok1} />
            </div>

            <div className="space-y-3 mt-8">
              <h2 className="text-xl font-bold">DOKUMEN 2</h2>
              <InputField inputLabel="Nama" inputPlaceholder="Nama" data={form.namaDok2} setData={(val) => handleInputChange("namaDok2", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.namaDok2} />
              {/* ... sebelum InputField Nama Dok 2 ... */}
              <InputField 
                inputLabel="Nama Dokumen 2" 
                inputPlaceholder="Contoh: Kartu Keluarga" 
                data={form.dokumen2} 
                setData={(val) => handleInputChange("dokumen2", val)} 
                setEditData={setEdit} 
                editData={edit} 
                submited={submited} 
                error={errors.dokumen2} 
              />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahirDok2} setData={(val) => handleInputChange("kotaLahirDok2", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.kotaLahirDok2} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahirDok2} setData={(val) => handleInputChange("tanggalLahirDok2", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.tanggalLahirDok2} />
              <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikDok2} setData={(val) => handleInputChange("nikDok2", val)} setEditData={setEdit} editData={edit} submited={submited} numberOnly error={errors.nikDok2} />
              <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="No KK" data={form.kkDok2} setData={(val) => handleInputChange("kkDok2", val)} setEditData={setEdit} editData={edit} submited={submited} numberOnly error={errors.kkDok2} />
              {/* DIPERBAIKI: 'data' ditambahkan dan 'setData' dipastikan benar */}
              <InputFieldDropdown inputLabel="Jenis Kelamin" inputPlaceholder="Pilih jenis kelamin" options={["Laki-laki", "Perempuan"]} data={form.jenisKelaminDok2} setData={(val) => handleInputChange("jenisKelaminDok2", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.jenisKelaminDok2} />
              <InputField inputLabel="Status Perkawinan" inputPlaceholder="Contoh: Sudah Menikah / Belum Menikah" data={form.statusDok2} setData={(val) => handleInputChange("statusDok2", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.statusDok2} />
              <InputField inputLabel="Alamat" inputPlaceholder="Alamat Lengkap" data={form.alamatDok2} setData={(val) => handleInputChange("alamatDok2", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.alamatDok2} />
            </div>

            <div className="flex gap-4 pt-8">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md">
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

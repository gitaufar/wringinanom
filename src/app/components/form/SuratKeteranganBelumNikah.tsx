"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState } from "react";
import type { ReactNode } from "react"; 

type SuratKeteranganBelumNikahProps = {
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


export default function SuratKeteranganBelumNikah({ tipe }: SuratKeteranganBelumNikahProps): ReactNode {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const initialState = {
    namaLengkap: "",
    nik: "",
    nomorKK: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    agama: "",
    kewarganegaraan: "Indonesia",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  
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
      if (!form[key] || !form[key].trim()) {
        const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
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
      return; // Hentikan jika ada error
    }
    setErrors({}); // Bersihkan error jika valid
    setShowConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => {
    setEdit(false);
    setLoading(true);

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: form.nik,
          jenis_surat: "belum_nikah",
          tipe,
          keterangan: `Permohonan Surat Belum Menikah oleh ${form.namaLengkap}`,
          data_dinamis: {
            nama: form.namaLengkap,
            nik: form.nik,
            noKK: form.nomorKK,
            kota: form.kotaLahir,
            tanggalLahir: form.tanggalLahir,
            jenisKelamin: form.jenisKelamin,
            alamat: form.alamat,
            agama: form.agama,
            kewarganegaraan: form.kewarganegaraan,
            
          },
        }),
      });

      const result = await res.json() as ApiResponse;
      if (!res.ok) {
        throw new Error(result.error);
      }

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
    setEdit(true);
    setSubmited("");
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
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
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN BELUM MENIKAH
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          {/* DIUBAH: Semua komponen input sekarang terhubung ke sistem validasi */}

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Identitas</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={form.namaLengkap} setData={(val) => handleInputChange("namaLengkap", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.namaLengkap} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nik} setData={(val) => handleInputChange("nik", val)} setEditData={setEdit} editData={edit} submited={submited} numberOnly error={errors.nikAnak} />
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor KK" data={form.nomorKK} setData={(val) => handleInputChange("nomorKK", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.nomorKK} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahir} setData={(val) => handleInputChange("kotaLahir", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={form.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.jenisKelamin} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={form.alamat} setData={(val) => handleInputChange("alamat", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.alamat} />
            <InputField inputLabel="Agama" inputPlaceholder="Agama" data={form.agama} setData={(val) => handleInputChange("agama", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.agama} />
            <InputField inputLabel="Kewarganegaraan" inputPlaceholder="Kewarganegaraan" data={form.kewarganegaraan} setData={(val) => handleInputChange("kewarganegaraan", val)} setEditData={setEdit} editData={edit} submited={submited} error={errors.kewarganegaraan} />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
              Submit
            </button>
            <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md transition-colors">
              Reset
            </button>
          </div>
        </form>

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

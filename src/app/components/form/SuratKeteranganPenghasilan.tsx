"use client";


import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganPenghasilanProps = {
  tipe: String;
};

export default function SuratKeteranganPenghasilan({ tipe }: SuratKeteranganPenghasilanProps) {
  const initialData = {
    NamaPengaju: "",
    KabupatenLahir: "",
    TanggalLahir: "",
    NIK: "",
    JenisKelamin2: "",
    perkerjaan: "",
    Alamat: "",
    Penghasilan: "",

  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const handleSubmit = async (e: React.FormEvent) => {
  // 1. Mencegah refresh halaman bawaan dari form
  e.preventDefault();

  // 2. Kumpulkan data dinamis dari state 'formData'
  const data_dinamis = {
    nama_pengaju: formData.NamaPengaju,
    tempat_lahir: formData.KabupatenLahir,
    tanggal_lahir: formData.TanggalLahir,
    jenis_kelamin: formData.JenisKelamin2,
    pekerjaan: formData.perkerjaan,
    alamat: formData.Alamat,
    penghasilan_per_bulan: formData.Penghasilan,
  };

  try {
    // 3. Kirim data ke endpoint API
    const res = await fetch("/api/permohonan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Data utama yang dibutuhkan oleh API
        nik: formData.NIK,
        jenis_surat: "Surat Keterangan Penghasilan",
        tipe: tipe,
        keterangan: `Pengajuan Surat Keterangan Penghasilan oleh ${formData.NamaPengaju}`,
        data_dinamis, // Data spesifik untuk surat ini
      }),
    });

    const result = await res.json();

    // 4. Periksa jika respons dari server tidak berhasil (status bukan 2xx)
    if (!res.ok) {
      throw new Error(result.error || "Gagal mengirim permohonan");
    }

    // 5. Jika berhasil, tampilkan notifikasi sukses dan redirect
    alert(`✅ Berhasil! Nomor Resi Anda: ${result.permohonan.no_resi}`);
    window.location.href = "/"; // Arahkan ke halaman utama

  } catch (err: any) {
    // 6. Jika terjadi error, tampilkan notifikasi kesalahan
    alert(`❌ Terjadi kesalahan: ${err.message}`);
    // (Opsional) Izinkan pengguna mengedit form kembali jika terjadi error
    // setEditData(true); 
  }
};

  const handleReset = () => {
    setFormData(initialData);
    setSubmited(null);
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
              SURAT KETERANGAN PENGHASILAN
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
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Nama Pengaju
            </h1>

            <InputField
              inputLabel="Nama Pengaju"
              inputPlaceholder="Nama Pengaju"
              data={formData.NamaPengaju}
              setData={(val) => setFormData({ ...formData, NamaPengaju: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Kabupaten Lahir"
              inputPlaceholder="Kabupaten Lahir"
              data={formData.KabupatenLahir}
              setData={(val) => setFormData({ ...formData, KabupatenLahir: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            

            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={formData.TanggalLahir}
              setData={(val) => setFormData({ ...formData, TanggalLahir: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={formData.NIK}
              setData={(val) => setFormData({ ...formData, NIK: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Jenis Kelamin"
              options={["Laki-laki", "Perempuan"]}
              data={formData.JenisKelamin2}
              setData={(val) => setFormData({ ...formData, JenisKelamin2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Pekerjaan"
              inputPlaceholder="Pekerjaan"
              data={formData.perkerjaan}
              setData={(val) => setFormData({ ...formData, perkerjaan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat Lengkap"
              inputPlaceholder="Alamat Lengkap"
              data={formData.Alamat}
              setData={(val) => setFormData({ ...formData, Alamat: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Penghasilan Per Bulan (Rp)"
              inputPlaceholder="Penghasilan Per Bulan (Rp)"
              data={formData.Penghasilan}
              setData={(val) => setFormData({ ...formData, Penghasilan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
        
            {/* Button Group */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium"
              >
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
    </div>
  );
}

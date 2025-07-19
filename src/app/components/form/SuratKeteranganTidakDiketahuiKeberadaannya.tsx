"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";

type SuratKeteranganTidakDiketahuiKeberadaannyaProps = {
  tipe: String;
};

export default function SuratKeteranganTidakDiketahuiKeberadaannya({ tipe }: SuratKeteranganTidakDiketahuiKeberadaannyaProps) {
  const initialData = {
    namaPengaju: "",
    nikPengaju: "",
    namaBersangkutan: "",
    nikBersangkutan: "",
    nomorKK: "",
    jenisKelamin: "",
    umur: "",
    tanggalLahir: "",
    alamat: "",
    pekerjaan: "",
    tanggalMulaiTidakDiketahui: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const handleSubmit = async (e: React.FormEvent) => {
  // 1. Mencegah refresh halaman
  e.preventDefault();

  // 2. Mengumpulkan semua data spesifik untuk surat ini
  const data_dinamis = {
    nama_pengaju: formData.namaPengaju,
    nik_pengaju: formData.nikPengaju,
    nama_bersangkutan: formData.namaBersangkutan,
    nik_bersangkutan: formData.nikBersangkutan,
    nomor_kk: formData.nomorKK,
    jenis_kelamin: formData.jenisKelamin,
    umur: formData.umur,
    tanggal_lahir: formData.tanggalLahir,
    alamat: formData.alamat,
    pekerjaan: formData.pekerjaan,
    tanggal_mulai_tidak_diketahui: formData.tanggalMulaiTidakDiketahui,
  };

  try {
    // 3. Mengirim data ke endpoint API
    const res = await fetch("/api/permohonan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Data utama yang dibutuhkan oleh API
        nik: formData.nikPengaju, // NIK dari orang yang mengajukan
        jenis_surat: "Surat Keterangan Tidak Diketahui Keberadaannya",
        tipe: tipe,
        keterangan: `Pengajuan surat untuk ${formData.namaBersangkutan} oleh ${formData.namaPengaju}`,
        data_dinamis, // Semua data tambahan
      }),
    });

    const result = await res.json();

    // 4. Memeriksa jika ada error dari server
    if (!res.ok) {
      throw new Error(result.error || "Gagal mengirim permohonan");
    }

    // 5. Jika berhasil, tampilkan notifikasi dan redirect
    alert(`✅ Berhasil! Nomor Resi Anda: ${result.permohonan.no_resi}`);
    window.location.href = "/"; // Arahkan ke halaman utama

  } catch (err: any) {
    // 6. Jika terjadi kesalahan, tampilkan notifikasi error
    alert(`❌ Terjadi kesalahan: ${err.message}`);
  }
};


  const handleReset = () => {
    setFormData(initialData);
    setSubmited(null);
    setEditData(true);
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
        <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pt-24 px-5 lg:px-[170px]">
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN TIDAK DIKETAHUI KEBERADAANNYA
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Mohon isi sesuai data dan sejujur-jujurnya.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8"
        >
          {/* Nama Pengaju */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama Pengaju</h2>
            <InputField
              inputLabel="Nama Pengaju"
              inputPlaceholder="Nama Pengaju"
              data={formData.namaPengaju}
              setData={(val) => setFormData({ ...formData, namaPengaju: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={formData.nikPengaju}
              setData={(val) => setFormData({ ...formData, nikPengaju: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              numberOnly
            />
          </div>

          {/* Nama yang Bersangkutan */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama yang Bersangkutan</h2>
            <InputField
              inputLabel="Nama Lengkap"
              inputPlaceholder="Nama Lengkap"
              data={formData.namaBersangkutan}
              setData={(val) => setFormData({ ...formData, namaBersangkutan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={formData.nikBersangkutan}
              setData={(val) => setFormData({ ...formData, nikBersangkutan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              numberOnly
            />
            <InputField
              inputLabel="Nomor Kartu Keluarga"
              inputPlaceholder="Nomor KK"
              data={formData.nomorKK}
              setData={(val) => setFormData({ ...formData, nomorKK: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputFieldDropdown
  inputLabel="Jenis Kelamin"
  inputPlaceholder="Pilih jenis kelamin"
  options={["Laki-laki", "Perempuan"]}
  setData={(val) => setFormData({ ...formData, jenisKelamin: val })}
  setEditData={setEditData}
  editData={editData}
  submited={submited}
/>
            <InputField
              inputLabel="Umur"
              inputPlaceholder="Umur"
              data={formData.umur}
              setData={(val) => setFormData({ ...formData, umur: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              numberOnly
            />
            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={formData.tanggalLahir}
              setData={(val) => setFormData({ ...formData, tanggalLahir: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Alamat"
              data={formData.alamat}
              setData={(val) => setFormData({ ...formData, alamat: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Pekerjaan"
              inputPlaceholder="Pekerjaan"
              data={formData.pekerjaan}
              setData={(val) => setFormData({ ...formData, pekerjaan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputFieldDate
              inputLabel="Tanggal Mulai Tidak Diketahui"
              data={formData.tanggalMulaiTidakDiketahui}
              setData={(val) => setFormData({ ...formData, tanggalMulaiTidakDiketahui: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md"
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
    </div>
  );
}

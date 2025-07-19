"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";

type SuratPengantarProps = {
  tipe: String;
};

export default function SuratPengantar({ tipe }: SuratPengantarProps) {
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    namaLengkap: "",
    kotaLahir: "",
    tanggalLahir: "",
    nik: "",
    nomorKK: "",
    jenisKelamin: "",
    agama: "",
    statusPerkawinan: "",
    pekerjaan: "",
    kewarganegaraan: "",
    alamat: "",
    pengajuan: "",
    tujuanPengajuan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  // 1. Mencegah refresh halaman
  e.preventDefault();

  // 2. Mengumpulkan semua data dari form ke dalam satu objek
  const data_dinamis = {
    nama_lengkap: formData.namaLengkap,
    tempat_lahir: formData.kotaLahir,
    tanggal_lahir: formData.tanggalLahir,
    nik: formData.nik,
    nomor_kk: formData.nomorKK,
    jenis_kelamin: formData.jenisKelamin,
    agama: formData.agama,
    status_perkawinan: formData.statusPerkawinan,
    pekerjaan: formData.pekerjaan,
    kewarganegaraan: formData.kewarganegaraan,
    alamat: formData.alamat,
    pengajuan: formData.pengajuan,
    tujuan_pengajuan: formData.tujuanPengajuan,
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
        nik: formData.nik, // NIK pengaju sebagai identitas utama
        jenis_surat: "Surat Pengantar",
        tipe: tipe,
        keterangan: `Pengajuan Surat Pengantar oleh ${formData.namaLengkap} untuk keperluan ${formData.pengajuan}`,
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
    setFormData({
      namaLengkap: "",
      kotaLahir: "",
      tanggalLahir: "",
      nik: "",
      nomorKK: "",
      jenisKelamin: "",
      agama: "",
      statusPerkawinan: "",
      pekerjaan: "",
      kewarganegaraan: "",
      alamat: "",
      pengajuan: "",
      tujuanPengajuan: "",
    });
    setEditData(true);
    setSubmited(null);
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
        <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
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
          className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8"
        >
          {/* DATA PENGAJU */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju</h2>

            <InputField
              inputLabel="Nama Lengkap"
              inputPlaceholder="Nama Lengkap"
              data={formData.namaLengkap}
              setData={(val) => setFormData({ ...formData, namaLengkap: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten"
              data={formData.kotaLahir}
              setData={(val) => setFormData({ ...formData, kotaLahir: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
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
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={formData.nik}
              setData={(val) => setFormData({ ...formData, nik: val })}
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
              numberOnly
            />

            <InputFieldDropdown
              inputLabel="Jenis Kelamin"
              options={["Laki-laki", "Perempuan"]}
              data={formData.jenisKelamin}
              setData={(val) => setFormData({ ...formData, jenisKelamin: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Agama"
              options={[
                "Islam",
                "Kristen",
                "Katolik",
                "Hindu",
                "Buddha",
                "Khonghucu",
              ]}
              data={formData.agama}
              setData={(val) => setFormData({ ...formData, agama: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Status Perkawinan"
              options={["Belum Kawin", "Kawin"]}
              data={formData.statusPerkawinan}
              setData={(val) =>
                setFormData({ ...formData, statusPerkawinan: val })
              }
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

            <InputField
              inputLabel="Kewarganegaraan"
              inputPlaceholder="Kewarganegaraan"
              data={formData.kewarganegaraan}
              setData={(val) =>
                setFormData({ ...formData, kewarganegaraan: val })
              }
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
          </div>

          {/* PENGAJUAN */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Pengajuan</h2>

            <InputField
              inputLabel="Pengajuan"
              inputPlaceholder="Contoh: Mengajukan pembuatan KTP"
              data={formData.pengajuan}
              setData={(val) => setFormData({ ...formData, pengajuan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Tujuan Pengajuan"
              inputPlaceholder="Contoh: Untuk keperluan administrasi kependudukan"
              data={formData.tujuanPengajuan}
              setData={(val) =>
                setFormData({ ...formData, tujuanPengajuan: val })
              }
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
          </div>

          {/* Buttons */}
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

        {/* Footer */}
        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}

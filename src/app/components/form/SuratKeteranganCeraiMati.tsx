"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganCeraiMatiProps = {
  tipe: String;
};

export default function SuratKeteranganCeraiMati({ tipe }: SuratKeteranganCeraiMatiProps) {
  const initialData = {
    NamaPengaju: "",
    NIKPengaju: "",

    //Page1 
    namaLengkap: "",
    Kabupaten: "",
    nomorKK: "",
    kotaLahir: "",
    tanggalLahir: "",
    NIK1: "",
    jenisKelamin: "",
    Status: "",
    goldarah: "",
    statusperkawinan: "",
    agama: "",
    Alamat1: "",
    Tujuan1: "",


    //Page2
    Nomorkartukeluarga: "",
    Nomorpaspor: "",
    TanggalKadaluarsaPaspor: "",
    NomorAktakelahiran: "",
    NomorAktaPerkawinan: "",
    TanggalPerkawinan: "",
    NomorAktaPerceraian: "",
    TanggalPerceraian: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEditData(false);

    // Kumpulkan semua data form ke dalam satu objek untuk dikirim
    const data_dinamis = {
      nama_pengaju: formData.NamaPengaju,
      nik_pengaju: formData.NIKPengaju,
      // Data Pasangan yang Meninggal
      nama_lengkap_pasangan: formData.namaLengkap,
      kabupaten: formData.Kabupaten,
      nomor_kk: formData.nomorKK,
      kota_lahir_pasangan: formData.kotaLahir,
      tanggal_lahir_pasangan: formData.tanggalLahir,
      nik_pasangan: formData.NIK1,
      jenis_kelamin_pasangan: formData.jenisKelamin,
      status_pasangan: formData.Status,
      golongan_darah_pasangan: formData.goldarah,
      status_perkawinan_pasangan: formData.statusperkawinan,
      agama_pasangan: formData.agama,
      alamat_pasangan: formData.Alamat1,
      tujuan_pembuatan_surat: formData.Tujuan1,
      // Data Tambahan
      nomor_kartu_keluarga_tambahan: formData.Nomorkartukeluarga,
      nomor_paspor: formData.Nomorpaspor,
      tanggal_kadaluarsa_paspor: formData.TanggalKadaluarsaPaspor,
      nomor_akta_kelahiran: formData.NomorAktakelahiran,
      nomor_akta_perkawinan: formData.NomorAktaPerkawinan,
      tanggal_perkawinan: formData.TanggalPerkawinan,
      nomor_akta_perceraian: formData.NomorAktaPerceraian,
      tanggal_perceraian: formData.TanggalPerceraian,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik: formData.NIKPengaju, // NIK dari pemohon utama
          jenis_surat: "Surat Keterangan Cerai Mati",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Cerai Mati oleh ${formData.NamaPengaju}`,
          data_dinamis,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal mengirim permohonan");
      }

      alert(`✅ Berhasil! Nomor Resi Anda: ${result.permohonan.no_resi}`);
      window.location.href = "/"; // Redirect ke homepage

    } catch (err: any) {
      alert(`❌ Terjadi kesalahan: ${err.message}`);
      setEditData(true); // Aktifkan kembali form jika gagal
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
              SURAT KETERANGAN CERAI MATI
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
              inputLabel="NIK "
              inputPlaceholder="NIK"
              data={formData.NIKPengaju}
              setData={(val) => setFormData({ ...formData, NIKPengaju: val })}
              numberOnly
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Identitas Personal
            </h1>

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
              inputPlaceholder="Masukan NIK"
              data={formData.NIK1}
              setData={(val) => setFormData({ ...formData, NIK1: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
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

            <InputField
              inputLabel="Status"
              inputPlaceholder="Masukan Status"
              data={formData.Status}
              setData={(val) => setFormData({ ...formData, Status: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Agama"
              options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
              data={formData.agama}
              setData={(val) => setFormData({ ...formData, agama: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Masukan Alamat"
              data={formData.Alamat1}
              setData={(val) => setFormData({ ...formData, Alamat1: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Tujuan"
              inputPlaceholder="Masukan Tujuan"
              data={formData.Tujuan1}
              setData={(val) => setFormData({ ...formData, Tujuan1: val })}
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
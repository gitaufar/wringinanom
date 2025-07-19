"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganDitinggalSuamiAtauIstriProps = {
  tipe: String;
};

export default function SuratKeteranganDitinggalSuamiAtauIstri({ tipe }: SuratKeteranganDitinggalSuamiAtauIstriProps) {
  const initialData = {
    NamaPengaju: "",
    NIKPengaju: "",

    //Page1 
    namaLengkap: "",
    umur2:"",
    Alamat2: "",
    pekerjaan: "",
    


    //Page2
    StatusPasangan: "",
    NamaLengkap: "",
    Umur: "",
    Alamat3: "",
    Perkerjaan: "",
    TanggalMenigallkan: "",
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
      // Data Pasangan yang Meninggalkan
      nama_pasangan_meninggalkan: formData.namaLengkap,
      umur_pasangan_meninggalkan: formData.umur2,
      alamat_pasangan_meninggalkan: formData.Alamat2,
      pekerjaan_pasangan_meninggalkan: formData.pekerjaan,
      // Data Pasangan yang Ditinggalkan
      status_ditinggalkan: formData.StatusPasangan, // Suami atau Istri
      nama_pasangan_ditinggalkan: formData.NamaLengkap,
      umur_pasangan_ditinggalkan: formData.Umur,
      alamat_pasangan_ditinggalkan: formData.Alamat3,
      pekerjaan_pasangan_ditinggalkan: formData.Perkerjaan,
      tanggal_meninggalkan: formData.TanggalMenigallkan,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik: formData.NIKPengaju, // NIK dari pemohon utama
          jenis_surat: "Surat Keterangan Ditinggal Suami atau Istri",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Ditinggal Pasangan oleh ${formData.NamaPengaju}`,
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
              SURAT KETERANGAN DITINGGAL SUAMI ATAU ISTRI
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
              Data Pasangan Yang Meninggalkan
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
              inputLabel="Umur"
              inputPlaceholder="Umur"
              data={formData.umur2}
              setData={(val) => setFormData({ ...formData, umur2: val })}
              numberOnly
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Masukan Alamat"
              data={formData.Alamat2}
              setData={(val) => setFormData({ ...formData, Alamat2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Perkerjaan"
              inputPlaceholder="Pekerjaan"
              data={formData.pekerjaan}
              setData={(val) => setFormData({ ...formData, pekerjaan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Pasangan Yang Ditinggalkan
            </h1>

            <InputFieldDropdown
              inputLabel="Status Pasangan"
              options={["Suami", "Istri"]}
              data={formData.StatusPasangan}
              setData={(val) => setFormData({ ...formData, StatusPasangan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Nama Lengkap"
              inputPlaceholder="Nama Lengkap"
              data={formData.NamaLengkap}
              setData={(val) => setFormData({ ...formData, NamaLengkap: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Umur"
              inputPlaceholder="Umur"
              data={formData.Umur}
              setData={(val) => setFormData({ ...formData, Umur: val })}
              numberOnly
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Masukan Alamat"
              data={formData.Alamat3}
              setData={(val) => setFormData({ ...formData, Alamat3: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Pekerjaan"
              inputPlaceholder="Pekerjaan"
              data={formData.Perkerjaan}
              setData={(val) => setFormData({ ...formData, Perkerjaan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDate
              inputLabel="Tanggal Meninggalkan"
              data={formData.TanggalMenigallkan}
              setData={(val) => setFormData({ ...formData, TanggalMenigallkan: val })}
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
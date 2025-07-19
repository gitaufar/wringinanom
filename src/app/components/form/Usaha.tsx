"use client";


import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type UsahaProps = {
  tipe: String;
};

export default function Usaha({ tipe }: UsahaProps) {
  const initialData = {
    NamaPengaju: "",
    Kotakabupaten: "",
    TanggalLahir: "",
    NIK1: "",
    Jeniskelamin: "",
    Agama1: "",
    Alamat: "",
    StatusPerkawinan: "",
    Kewarganegaraan: "",
    JenisUsaha: "",
    Tahunberdiri: "",
    
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const jenis_surat = "pelayanan umum";

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmited("submit");
  setEditData(false);

  try {
    const res = await fetch("/api/permohonan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nik: formData.NIK1,
        jenis_surat,
        tipe,
        data_dinamis: formData,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Gagal membuat permohonan");
    }

    alert(`✅ Permohonan berhasil! No Resi: ${data.permohonan.no_resi}`);
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    alert("❌ Gagal mengirim permohonan: " + err.message);
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
              inputLabel=" Kota/Kabupaten Lahir"
              inputPlaceholder=" Kota/Kabupaten Lahir"
              data={formData.Kotakabupaten}
              setData={(val) => setFormData({ ...formData, Kotakabupaten: val })}
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
              data={formData.NIK1}
              setData={(val) => setFormData({ ...formData, NIK1: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Jenis Kelamin"
              options={["Laki-laki", "Perempuan"]}
              data={formData.Jeniskelamin}
              setData={(val) => setFormData({ ...formData, Jeniskelamin: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Agama"
              options={["Islam", "Kristen", "Hindu", "Buddha", "Konghucu"]}
              data={formData.Agama1}
              setData={(val) => setFormData({ ...formData, Agama1: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Alamat"
              data={formData.Alamat}
              setData={(val) => setFormData({ ...formData, Alamat: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Status Perkawinan"
              options={["Belum Menikah", "Menikah"]}
              data={formData.StatusPerkawinan}
              setData={(val) => setFormData({ ...formData, StatusPerkawinan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Jenis Usaha"
              inputPlaceholder={"Jenis Usaha"} 
              data={formData.JenisUsaha}
              setData={(val) => setFormData({ ...formData, JenisUsaha: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}            
              />


            <InputField
              inputLabel="Tahun Berdiri"
              inputPlaceholder="Tahun Berdiri"
              data={formData.Tahunberdiri}
              setData={(val) => setFormData({ ...formData, Tahunberdiri: val })}
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

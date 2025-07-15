"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";

export default function CeraiMatiForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [namaOrangTua, setNamaOrangTua] = useState("John");
  const [kotaLahir, setKotaLahir] = useState("Co. Malang");
  const [tanggalLahir, setTanggalLahir] = useState("2005-11-22");
  const [nik, setNik] = useState("929292929");
  const [jenisKelamin, setJenisKelamin] = useState("Laki-laki");
  const [status, setStatus] = useState("Cerai Mati");
  const [agama, setAgama] = useState("Co. Kejawen");
  const [alamat, setAlamat] = useState("Co. Dusun Simpar No 003");

  const handleSubmit = () => {
    setSubmited("submit");
    setEdit(false);
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

      <div className="w-full pt-24 px-5 lg:px-[170px]">
        {/* Header */}
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN CERAI MATI
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Orang Tua</h2>

            <InputField
              inputLabel="Nama Orang Tua"
              inputPlaceholder="Nama Orang Tua"
              data={namaOrangTua}
              setData={setNamaOrangTua}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten"
              data={kotaLahir}
              setData={setKotaLahir}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={tanggalLahir}
              setData={setTanggalLahir}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={nik}
              setData={setNik}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              numberOnly
            />
            
            {/* <InputField inputLabel="Jenis Kelamin" inputPlaceholder="Jenis Kelamin" data={jenisKelamin} setData={setJenisKelamin} setEditData={setEdit} editData={edit} submited={submited} /> */}

            <InputField
              inputLabel="Status"
              inputPlaceholder="Cerai Mati"
              data={status}
              setData={setStatus}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="Agama"
              inputPlaceholder="Agama"
              data={agama}
              setData={setAgama}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Alamat"
              data={alamat}
              setData={setAlamat}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />
          </div>

          {/* Submit Button (Left-Aligned) */}
          <div className="text-start">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}

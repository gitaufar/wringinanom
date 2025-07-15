"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import { useState } from "react";

export default function SuratKeteranganStatusForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [namaLengkap, setNamaLengkap] = useState("Ahmad Fikri");
  const [binBinti, setBinBinti] = useState("Bin Sulaiman");
  const [nik, setNik] = useState("1234567890123456");
  const [kotaLahir, setKotaLahir] = useState("Malang");
  const [tanggalLahir, setTanggalLahir] = useState("2000-01-01");
  const [jenisKelamin, setJenisKelamin] = useState("Laki-laki");
  const [kewarganegaraan, setKewarganegaraan] = useState("Indonesia");
  const [statusPerkawinan, setStatusPerkawinan] = useState("Belum Kawin");
  const [pekerjaan, setPekerjaan] = useState("Mahasiswa");
  const [agama, setAgama] = useState("Islam");
  const [alamat, setAlamat] = useState("Jl. Mawar No. 10, Malang");

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
        {/* Judul & Subjudul */}
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN STATUS
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju</h2>

            <InputField
              inputLabel="Nama Lengkap"
              inputPlaceholder="Nama Lengkap"
              data={namaLengkap}
              setData={setNamaLengkap}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="Bin/Binti"
              inputPlaceholder="Contoh: Bin Abdullah / Binti Abdullah"
              data={binBinti}
              setData={setBinBinti}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="NIK"
              inputPlaceholder="Nomor Induk Kependudukan"
              data={nik}
              setData={setNik}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
              numberOnly
            />

            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Contoh: Malang"
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

            <InputFieldDropdown
              inputLabel="Jenis Kelamin"
              options={["Laki-laki", "Perempuan"]}
              data={jenisKelamin}
              setData={setJenisKelamin}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="Kewarganegaraan"
              inputPlaceholder="Contoh: Indonesia"
              data={kewarganegaraan}
              setData={setKewarganegaraan}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Status Perkawinan"
              options={["Belum Kawin", "Kawin"]}
              data={statusPerkawinan}
              setData={setStatusPerkawinan}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="Pekerjaan"
              inputPlaceholder="Contoh: Mahasiswa, Pegawai, dll"
              data={pekerjaan}
              setData={setPekerjaan}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Agama"
              options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
              data={agama}
              setData={setAgama}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Alamat Tempat Tinggal"
              data={alamat}
              setData={setAlamat}
              setEditData={setEdit}
              editData={edit}
              submited={submited}
            />
          </div>

          {/* Tombol Submit */}
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

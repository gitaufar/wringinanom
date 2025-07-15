"use client";

import React, { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { ChevronRight } from "lucide-react";
import InputFieldDropdown from "../field/InputFieldDropdown";

export default function TidakMampuForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [nama, setNama] = useState("");
  const [kotaKabupatenLahir, setKotaKabupatenLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [nik, setNik] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [agama, setAgama] = useState("");

  const handleSubmit = () => {
    setSubmited("submit");
    setEdit(false);
    console.log({
      nama,
      kotaKabupatenLahir,
      tanggalLahir,
      nik,
      agama,
      pekerjaan,
      alamat,
    });
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
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold">SURAT KETERANGAN WALI NIKAH</h1>
          <p className="max-w-xl mx-auto mt-2">
            Silakan lengkapi data berikut untuk proses pengajuan surat.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          <h2 className="text-xl font-bold">Data Pengaju</h2>

          <InputField
            inputLabel="Nama"
            inputPlaceholder="Nama Pengaju"
            data={nama}
            setData={setNama}
            setEditData={setEdit}
            editData={edit}
            submited={submited}
          />

          <InputField
            inputLabel="Kota/Kabupaten Lahir"
            inputPlaceholder="Kota/Kabupaten"
            data={kotaKabupatenLahir}
            setData={setKotaKabupatenLahir}
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

          {/* JENISKELAMIN */}

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

          <InputFieldDropdown
            options={["Laki-laki", "Perempuan"]}
            inputLabel="Agama"
            inputPlaceholder="Agama"
            data={agama}
            setData={setAgama}
            setEditData={setEdit}
            editData={edit}
            submited={submited}
          />

          <InputField
            inputLabel="Pekerjaan"
            inputPlaceholder="Pekerjaan"
            data={pekerjaan}
            setData={setPekerjaan}
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

          <div className="pt-6 text-right">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Submit
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}

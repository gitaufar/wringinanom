    "use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import { useState } from "react";

export default function DitinggalPasanganForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  // NAMA PENGAJU
  const [namaPengaju, setNamaPengaju] = useState("Dewi");
  const [nikPengaju, setNikPengaju] = useState("987654321");

  // DATA PASANGAN YANG MENINGGALKAN
  const [namaMeninggalkan, setNamaMeninggalkan] = useState("Rudi");
  const [umurMeninggalkan, setUmurMeninggalkan] = useState("40");
  const [alamatMeninggalkan, setAlamatMeninggalkan] = useState("Jl. Kenanga No. 5");
  const [pekerjaanMeninggalkan, setPekerjaanMeninggalkan] = useState("Petani");

  // DATA PASANGAN YANG DITINGGALKAN
  const [statusPasangan, setStatusPasangan] = useState("Suami");
  const [namaDitinggalkan, setNamaDitinggalkan] = useState("Dewi");
  const [umurDitinggalkan, setUmurDitinggalkan] = useState("38");
  const [alamatDitinggalkan, setAlamatDitinggalkan] = useState("Jl. Kenanga No. 5");
  const [pekerjaanDitinggalkan, setPekerjaanDitinggalkan] = useState("Ibu Rumah Tangga");
  const [tempatMeninggalkan, setTempatMeninggalkan] = useState("Kota Jakarta");

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
              SURAT KETERANGAN DITINGGAL SUAMI ATAU ISTRI
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">

          {/* NAMA PENGAJU */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju</h2>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={namaPengaju} setData={setNamaPengaju} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={nikPengaju} setData={setNikPengaju} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
          </div>

          {/* DATA PASANGAN YANG MENINGGALKAN */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pasangan yang Meninggalkan</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={namaMeninggalkan} setData={setNamaMeninggalkan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Umur" inputPlaceholder="Umur" data={umurMeninggalkan} setData={setUmurMeninggalkan} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={alamatMeninggalkan} setData={setAlamatMeninggalkan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={pekerjaanMeninggalkan} setData={setPekerjaanMeninggalkan} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* DATA PASANGAN YANG DITINGGALKAN */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pasangan yang Ditinggalkan</h2>
            <InputFieldDropdown inputLabel="Status Pasangan" options={["Suami", "Istri"]} data={statusPasangan} setData={setStatusPasangan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={namaDitinggalkan} setData={setNamaDitinggalkan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Umur" inputPlaceholder="Umur" data={umurDitinggalkan} setData={setUmurDitinggalkan} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={alamatDitinggalkan} setData={setAlamatDitinggalkan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={pekerjaanDitinggalkan} setData={setPekerjaanDitinggalkan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Tempat Meninggalkan" inputPlaceholder="Tempat Meninggalkan" data={tempatMeninggalkan} setData={setTempatMeninggalkan} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* Submit Button */}
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

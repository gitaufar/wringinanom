"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import { useState } from "react";

export default function SuratKematianForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  // NAMA PENGAJU
  const [namaPengaju, setNamaPengaju] = useState("Andi");
  const [nikPengaju, setNikPengaju] = useState("123456789");

  // DATA ALMARHUM/ALMARHUMAH
  const [namaAlmarhum, setNamaAlmarhum] = useState("Budi");
  const [namaOrangTua, setNamaOrangTua] = useState("Samsul");
  const [nikAlmarhum, setNikAlmarhum] = useState("987654321");
  const [kotaLahir, setKotaLahir] = useState("Surabaya");
  const [tanggalLahir, setTanggalLahir] = useState("1990-01-01");
  const [jenisKelamin, setJenisKelamin] = useState("Laki-laki");
  const [agama, setAgama] = useState("Islam");
  const [pekerjaan, setPekerjaan] = useState("Petani");
  const [alamatAlmarhum, setAlamatAlmarhum] = useState("Jl. Merdeka No. 10");

  // WAKTU MENINGGAL
  const [hari, setHari] = useState("Senin");
  const [tanggalKematian, setTanggalKematian] = useState("2023-12-01");
  const [waktuKematian, setWaktuKematian] = useState("08:30");
  const [tempatKematian, setTempatKematian] = useState("Rumah");
  const [penyebabKematian, setPenyebabKematian] = useState("Sakit");
  const [alamatMeninggal, setAlamatMeninggal] = useState("Jl. Merdeka No. 10");

  const handleSubmit = () => {
    setSubmited("submit");
    setEdit(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Top Bar */}
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
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
              SURAT KETERANGAN KEMATIAN
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

          {/* DATA ALMARHUM */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Almarhum/Almarhumah</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={namaAlmarhum} setData={setNamaAlmarhum} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Nama Orang Tua" inputPlaceholder="Nama Orang Tua" data={namaOrangTua} setData={setNamaOrangTua} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={nikAlmarhum} setData={setNikAlmarhum} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={kotaLahir} setData={setKotaLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={tanggalLahir} setData={setTanggalLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={jenisKelamin} setData={setJenisKelamin} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={agama} setData={setAgama} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={pekerjaan} setData={setPekerjaan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={alamatAlmarhum} setData={setAlamatAlmarhum} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* WAKTU MENINGGAL */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Waktu Meninggal</h2>
            <InputField inputLabel="Hari" inputPlaceholder="Contoh: Senin" data={hari} setData={setHari} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Kematian" data={tanggalKematian} setData={setTanggalKematian} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Waktu Kematian" inputPlaceholder="Contoh: 08:30" data={waktuKematian} setData={setWaktuKematian} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Tempat Kematian" inputPlaceholder="Contoh: Rumah Sakit" data={tempatKematian} setData={setTempatKematian} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Penyebab Kematian" inputPlaceholder="Contoh: Sakit" data={penyebabKematian} setData={setPenyebabKematian} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat saat meninggal" data={alamatMeninggal} setData={setAlamatMeninggal} setEditData={setEdit} editData={edit} submited={submited} />
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

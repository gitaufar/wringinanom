"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import InputFieldTime from "../../components/field/InputFieldTime";

export default function SuratKeteranganKehilanganKepolisian() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    kotaLahir: "",
    tanggalLahir: "",
    nik: "",
    nomorKK: "",
    jenisKelamin: "",
    agama: "",
    pekerjaan: "",
    alamat: "",
    namaBarang: "",
    lokasiKehilangan: "",
    tanggalKehilangan: "",
    jamKehilangan: "",
  });

  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmited("submit");
    setEditData(false);
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
      pekerjaan: "",
      alamat: "",
      namaBarang: "",
      lokasiKehilangan: "",
      tanggalKehilangan: "",
      jamKehilangan: "",
    });
    setSubmited(null);
    setEditData(true);
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>

      <div className="w-full pt-24 px-5 lg:px-[170px]">
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN KEHILANGAN KEPOLISIAN
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
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.namaLengkap} setData={(val) => setFormData({ ...formData, namaLengkap: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.kotaLahir} setData={(val) => setFormData({ ...formData, kotaLahir: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => setFormData({ ...formData, tanggalLahir: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nik} setData={(val) => setFormData({ ...formData, nik: val })} setEditData={setEditData} editData={editData} submited={submited} numberOnly />
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor KK" data={formData.nomorKK} setData={(val) => setFormData({ ...formData, nomorKK: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => setFormData({ ...formData, jenisKelamin: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.agama} setData={(val) => setFormData({ ...formData, agama: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaan} setData={(val) => setFormData({ ...formData, pekerjaan: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamat} setData={(val) => setFormData({ ...formData, alamat: val })} setEditData={setEditData} editData={editData} submited={submited} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Kehilangan</h2>
            <InputField inputLabel="Nama Barang" inputPlaceholder="Nama Barang" data={formData.namaBarang} setData={(val) => setFormData({ ...formData, namaBarang: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputField inputLabel="Lokasi Kehilangan" inputPlaceholder="Lokasi Kehilangan" data={formData.lokasiKehilangan} setData={(val) => setFormData({ ...formData, lokasiKehilangan: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Kehilangan" data={formData.tanggalKehilangan} setData={(val) => setFormData({ ...formData, tanggalKehilangan: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldTime inputLabel="Jam Kehilangan" data={formData.jamKehilangan} setData={(val) => setFormData({ ...formData, jamKehilangan: val })} setEditData={setEditData} editData={editData} submited={submited} />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">
              Submit
            </button>
            <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">
              Reset
            </button>
          </div>
        </form>

        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}

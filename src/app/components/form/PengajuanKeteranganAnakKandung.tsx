"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";

export default function PengajuanKeteranganAnakKandung() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const initialState = {
    namaPengaju: "",
    nikPengaju: "",
    namaLengkap: "",
    alamatAnak: "",
    anakKe: "",
    darixSaudara: "",
    kotaLahir: "",
    tanggalLahir: "",
    alamat: "",
    namaBaru: "",
    tanggalLahirBaru: "",
    kotaKabupatenLahir: "",
    pekerjaan: "",
  };

  const [form, setForm] = useState(initialState);

  const handleSubmit = () => {
    setSubmited("submit");
    setEdit(false);
  };

  const handleReset = () => {
    setForm(initialState);
    setEdit(true);
    setSubmited(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header */}
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">Pengajuan Surat</div>
      </div>

      <div className="w-full pt-24 px-5 lg:px-[170px]">
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">SURAT KETERANGAN ANAK KANDUNG</h1>
            <p className="text-black text-base max-w-xl mx-auto">Silakan lengkapi data berikut untuk proses pengajuan surat.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          {/* Nama Pengaju */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama Pengaju</h2>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={form.namaPengaju} setData={(val) => setForm({ ...form, namaPengaju: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikPengaju} setData={(val) => setForm({ ...form, nikPengaju: val })} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
          </div>

          {/* Data Anak */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Anak</h2>
            <InputField inputLabel="Nama Anak" inputPlaceholder="Nama Lengkap" data={form.namaLengkap} setData={(val) => setForm({ ...form, namaLengkap: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahir} setData={(val) => setForm({ ...form, kotaLahir: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahir} setData={(val) => setForm({ ...form, tanggalLahir: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat Anak" inputPlaceholder="Alamat Anak" data={form.alamatAnak} setData={(val) => setForm({ ...form, alamatAnak: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Adalah anak ke-" inputPlaceholder="Contoh 1" data={form.anakKe} setData={(val) => setForm({ ...form, anakKe: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Dari x Saudara" inputPlaceholder="Contoh 3" data={form.darixSaudara} setData={(val) => setForm({ ...form, darixSaudara: val })} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* Data Ayah */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Ayah</h2>
            <InputField inputLabel="Nama Ayah" inputPlaceholder="Nama" data={form.namaBaru} setData={(val) => setForm({ ...form, namaBaru: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir Ayah" inputPlaceholder="Kota/Kabupaten" data={form.kotaKabupatenLahir} setData={(val) => setForm({ ...form, kotaKabupatenLahir: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahirBaru} setData={(val) => setForm({ ...form, tanggalLahirBaru: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat Ayah" data={form.alamat} setData={(val) => setForm({ ...form, alamat: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={form.pekerjaan} setData={(val) => setForm({ ...form, pekerjaan: val })} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* Data Ibu */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Ibu</h2>
            <InputField inputLabel="Nama Ibu" inputPlaceholder="Nama" data={form.namaBaru} setData={(val) => setForm({ ...form, namaBaru: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir Ibu" inputPlaceholder="Kota/Kabupaten" data={form.kotaKabupatenLahir} setData={(val) => setForm({ ...form, kotaKabupatenLahir: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahirBaru} setData={(val) => setForm({ ...form, tanggalLahirBaru: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Co. Dusun Simpar No 003" data={form.alamat} setData={(val) => setForm({ ...form, alamat: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={form.pekerjaan} setData={(val) => setForm({ ...form, pekerjaan: val })} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* Button Group */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md"
            >
              Reset
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

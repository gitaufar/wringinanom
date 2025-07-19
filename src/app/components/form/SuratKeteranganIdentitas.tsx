"use client";

import InputField from "./../../components/field/InputField";
import InputFieldDate from "./../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganIdentitasProps = {
  tipe: String;
};

export default function SuratKeteranganIdentitas({ tipe }: SuratKeteranganIdentitasProps) {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const initialState = {
    namaPengaju: "",
    nikPengaju: "",

    // Dokumen 1
    namaDok1: "",
    kotaLahirDok1: "",
    tanggalLahirDok1: "",
    nikDok1: "",
    kkDok1: "",
    jenisKelaminDok1: "",
    alamatDok1: "",
    statusDok1: "",

    // Dokumen 2
    namaDok2: "",
    kotaLahirDok2: "",
    tanggalLahirDok2: "",
    nikDok2: "",
    kkDok2: "",
    jenisKelaminDok2: "",
    statusDok2: "",
    alamatDok2: "",
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
        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>

      <div className="w-full pt-24 px-5 lg:px-[170px]">
        {/* Judul Tengah */}
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN IDENTITAS
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          {/* Nama Pengaju */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama Pengaju</h2>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={form.namaPengaju} setData={(val) => setForm({ ...form, namaPengaju: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikPengaju} setData={(val) => setForm({ ...form, nikPengaju: val })} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
          </div>

          {/* Dokumen 1 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">DOKUMEN 1</h2>
            <InputField inputLabel="Nama" inputPlaceholder="Nama" data={form.namaDok1} setData={(val) => setForm({ ...form, namaDok1: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahirDok1} setData={(val) => setForm({ ...form, kotaLahirDok1: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahirDok1} setData={(val) => setForm({ ...form, tanggalLahirDok1: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikDok1} setData={(val) => setForm({ ...form, nikDok1: val })} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="No KK" data={form.kkDok1} setData={(val) => setForm({ ...form, kkDok1: val })} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            <InputFieldDropdown
  inputLabel="Jenis Kelamin"
  inputPlaceholder="Pilih jenis kelamin"
  options={["Laki-laki", "Perempuan"]}
  setData={(val) => setForm({ ...form, jenisKelaminDok2: val })}
  setEditData={setEdit}
  editData={edit}
  submited={submited}
/>
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat Lengkap" data={form.alamatDok1} setData={(val) => setForm({ ...form, alamatDok1: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Status" inputPlaceholder="Contoh: Suami / Istri / Anak" data={form.statusDok1} setData={(val) => setForm({ ...form, statusDok1: val })} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* Dokumen 2 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">DOKUMEN 2</h2>
            <InputField inputLabel="Nama" inputPlaceholder="Nama" data={form.namaDok2} setData={(val) => setForm({ ...form, namaDok2: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahirDok2} setData={(val) => setForm({ ...form, kotaLahirDok2: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahirDok2} setData={(val) => setForm({ ...form, tanggalLahirDok2: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikDok2} setData={(val) => setForm({ ...form, nikDok2: val })} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="No KK" data={form.kkDok2} setData={(val) => setForm({ ...form, kkDok2: val })} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            <InputFieldDropdown
  inputLabel="Jenis Kelamin"
  inputPlaceholder="Pilih jenis kelamin"
  options={["Laki-laki", "Perempuan"]}
  setData={(val) => setForm({ ...form, jenisKelaminDok2: val })}
  setEditData={setEdit}
  editData={edit}
  submited={submited}
/>
            <InputField inputLabel="Status" inputPlaceholder="Contoh: Suami / Istri / Anak" data={form.statusDok2} setData={(val) => setForm({ ...form, statusDok2: val })} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat Lengkap" data={form.alamatDok2} setData={(val) => setForm({ ...form, alamatDok2: val })} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4">
            <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Submit
            </button>
            <button onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md">
              Reset
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

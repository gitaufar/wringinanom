"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";

type PengajuanKeteranganAnakKandungProps = {
  tipe: String;
};

export default function PengajuanKeteranganAnakKandung({ tipe }: PengajuanKeteranganAnakKandungProps) {
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

  namaAyah: "",
  kotaLahirAyah: "",
  tanggalLahirAyah: "",
  alamatAyah: "",
  pekerjaanAyah: "",

  namaIbu: "",
  kotaLahirIbu: "",
  tanggalLahirIbu: "",
  alamatIbu: "",
  pekerjaanIbu: "",
};

  const [form, setForm] = useState(initialState);

  const handleSubmit = async () => {
  try {
    setSubmited("submit");
    setEdit(false);

    const res = await fetch("/api/permohonan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nik: form.nikPengaju,
        jenis_surat: "Anak Kandung",
        tipe,
        keterangan: `Permohonan Surat Anak Kandung oleh ${form.namaPengaju}`,
        data_dinamis: {
          namaPengaju: form.namaPengaju,
          namaAnak: form.namaLengkap,
          alamatAnak: form.alamatAnak,
          anakKe: form.anakKe,
          dariSaudara: form.darixSaudara,
          kotaLahirAnak: form.kotaLahir,
          tanggalLahirAnak: form.tanggalLahir,

          namaAyah: form.namaAyah,
          kotaLahirAyah: form.kotaLahirAyah,
          tanggalLahirAyah: form.tanggalLahirAyah,
          alamatAyah: form.alamatAyah,
          pekerjaanAyah: form.pekerjaanAyah,

          namaIbu: form.namaIbu,
          kotaLahirIbu: form.kotaLahirIbu,
          tanggalLahirIbu: form.tanggalLahirIbu,
          alamatIbu: form.alamatIbu,
          pekerjaanIbu: form.pekerjaanIbu,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    alert(`✅ Permohonan berhasil! No Resi: ${data.permohonan.no_resi}`);
  } catch (err: any) {
    alert(`❌ Gagal mengirim permohonan: ${err.message}`);
    setEdit(true);
  }
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

        {/* Form Wrapper */}
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
    <InputField inputLabel="Nama Ayah" inputPlaceholder="Nama Lengkap" data={form.namaAyah} setData={(val) => setForm({ ...form, namaAyah: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputField inputLabel="Kota/Kabupaten Lahir Ayah" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahirAyah} setData={(val) => setForm({ ...form, kotaLahirAyah: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputFieldDate inputLabel="Tanggal Lahir Ayah" data={form.tanggalLahirAyah} setData={(val) => setForm({ ...form, tanggalLahirAyah: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputField inputLabel="Alamat Ayah" inputPlaceholder="Alamat Lengkap" data={form.alamatAyah} setData={(val) => setForm({ ...form, alamatAyah: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputField inputLabel="Pekerjaan Ayah" inputPlaceholder="Pekerjaan" data={form.pekerjaanAyah} setData={(val) => setForm({ ...form, pekerjaanAyah: val })} setEditData={setEdit} editData={edit} submited={submited} />
  </div>

  {/* Data Ibu */}
  <div className="space-y-3">
    <h2 className="text-xl font-bold">Data Ibu</h2>
    <InputField inputLabel="Nama Ibu" inputPlaceholder="Nama Lengkap" data={form.namaIbu} setData={(val) => setForm({ ...form, namaIbu: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputField inputLabel="Kota/Kabupaten Lahir Ibu" inputPlaceholder="Kota/Kabupaten" data={form.kotaLahirIbu} setData={(val) => setForm({ ...form, kotaLahirIbu: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputFieldDate inputLabel="Tanggal Lahir Ibu" data={form.tanggalLahirIbu} setData={(val) => setForm({ ...form, tanggalLahirIbu: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputField inputLabel="Alamat Ibu" inputPlaceholder="Alamat Lengkap" data={form.alamatIbu} setData={(val) => setForm({ ...form, alamatIbu: val })} setEditData={setEdit} editData={edit} submited={submited} />
    <InputField inputLabel="Pekerjaan Ibu" inputPlaceholder="Pekerjaan" data={form.pekerjaanIbu} setData={(val) => setForm({ ...form, pekerjaanIbu: val })} setEditData={setEdit} editData={edit} submited={submited} />
  </div>

  {/* Button Group */}
  <div className="flex gap-4 pt-4">
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

"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganWaliMuridProps = {
  tipe: string;
};

export default function SuratKeteranganWaliMurid({ tipe }: SuratKeteranganWaliMuridProps) {
  const initialData = {
    NamaPengaju: "",
    NIKPengaju: "",
    KotakabupatenPengaju: "",
    TanggalLahirPengaju: "",
    JeniskelaminPengaju: "",
    KewarganegaraanPengaju: "WNI",
    PekerjaanPengaju: "",
    AlamatPengaju: "",
    NamaAnak: "",
    KotakabupatenAnak: "",
    TanggalLahirAnak: "",
    JeniskelaminAnak: "",
    PekerjaanAnak: "Pelajar/Mahasiswa",
    Kelas: "",
    AlamatAnak: "",
  };

  const [formData, setFormData] = useState(initialData);
  
  // DIKEMBALIKAN: State ini dibutuhkan oleh komponen InputField Anda.
  const [editData, setEditData] = useState(true);
  
  // DIKEMBALIKAN: State ini juga dibutuhkan.
  // Dengan nilai awal '""', tombol "Edit/Simpan" tidak akan muncul.
  const [submited, setSubmited] = useState<string | null>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kunci form setelah submit berhasil
    setEditData(false);

    const data_dinamis = {
      wali: {
        nama: formData.NamaPengaju,
        nik: formData.NIKPengaju,
        tempat_lahir: formData.KotakabupatenPengaju,
        tanggal_lahir: formData.TanggalLahirPengaju,
        jenis_kelamin: formData.JeniskelaminPengaju,
        kewarganegaraan: formData.KewarganegaraanPengaju,
        pekerjaan: formData.PekerjaanPengaju,
        alamat: formData.AlamatPengaju,
      },
      murid: {
        nama: formData.NamaAnak,
        tempat_lahir: formData.KotakabupatenAnak,
        tanggal_lahir: formData.TanggalLahirAnak,
        jenis_kelamin: formData.JeniskelaminAnak,
        pekerjaan: formData.PekerjaanAnak,
        kelas: formData.Kelas,
        alamat: formData.AlamatAnak,
      },
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.NIKPengaju,
          jenis_surat: "Surat Keterangan Wali Murid",
          tipe: tipe,
          keterangan: `Pengajuan surat wali murid oleh ${formData.NamaPengaju} untuk murid ${formData.NamaAnak}`,
          data_dinamis,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        setEditData(true); // Buka kembali form jika gagal
        throw new Error(result.error || "Gagal mengirim permohonan");
      }

      alert(`✅ Berhasil! Nomor Resi Anda: ${result.permohonan.no_resi}`);
      window.location.href = "/";

    } catch (err: any) {
      setEditData(true); // Buka kembali form jika gagal
      alert(`❌ Terjadi kesalahan: ${err.message}`);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setEditData(true);
    setSubmited(""); // Reset ke state awal
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
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

      {/* Main Content */}
      <div className="w-full pt-20">
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] py-8 md:py-[60px]">
          <div className="flex flex-col items-center gap-6 flex-1">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold text-center">
              SURAT KETERANGAN WALI MURID
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] pb-10">
          <form onSubmit={handleSubmit} className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-8 rounded-[15px] bg-white shadow">
            
            {/* --- Bagian Data Wali Murid --- */}
            <div className="flex flex-col gap-6">
              <h1 className="text-black text-[32px] font-bold">Data Wali Murid (Pengaju)</h1>
              {/* PERBAIKAN: Semua prop yang dibutuhkan sekarang diberikan */}
              <InputField inputLabel="Nama Lengkap" inputPlaceholder="Masukkan nama lengkap wali" data={formData.NamaPengaju} setData={(val) => setFormData({ ...formData, NamaPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputField inputLabel="NIK" inputPlaceholder="Masukkan NIK wali" data={formData.NIKPengaju} setData={(val) => setFormData({ ...formData, NIKPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} numberOnly/>
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Masukkan tempat lahir wali" data={formData.KotakabupatenPengaju} setData={(val) => setFormData({ ...formData, KotakabupatenPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={formData.TanggalLahirPengaju} setData={(val) => setFormData({ ...formData, TanggalLahirPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.JeniskelaminPengaju} setData={(val) => setFormData({ ...formData, JeniskelaminPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputFieldDropdown inputLabel="Kewarganegaraan" options={["WNI", "WNA"]} data={formData.KewarganegaraanPengaju} setData={(val) => setFormData({ ...formData, KewarganegaraanPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputField inputLabel="Pekerjaan" inputPlaceholder="Masukkan pekerjaan wali" data={formData.PekerjaanPengaju} setData={(val) => setFormData({ ...formData, PekerjaanPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputField inputLabel="Alamat" inputPlaceholder="Masukkan alamat lengkap wali" data={formData.AlamatPengaju} setData={(val) => setFormData({ ...formData, AlamatPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
            </div>

            {/* --- Bagian Data Anak --- */}
            <div className="flex flex-col gap-6">
              <h1 className="text-black text-[32px] font-bold">Data Anak (Murid)</h1>
              <InputField inputLabel="Nama Anak" inputPlaceholder="Co. Siti" data={formData.NamaAnak} setData={(val) => setFormData({ ...formData, NamaAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Co. Malang" data={formData.KotakabupatenAnak} setData={(val) => setFormData({ ...formData, KotakabupatenAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={formData.TanggalLahirAnak} setData={(val) => setFormData({ ...formData, TanggalLahirAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.JeniskelaminAnak} setData={(val) => setFormData({ ...formData, JeniskelaminAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputField inputLabel="Pekerjaan" inputPlaceholder="Co. Pelajar/Mahasiswa" data={formData.PekerjaanAnak} setData={(val) => setFormData({ ...formData, PekerjaanAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputField inputLabel="Kelas" inputPlaceholder="Co. VII" data={formData.Kelas} setData={(val) => setFormData({ ...formData, Kelas: val })} setEditData={setEditData} editData={editData} submited={submited} />
              <InputField inputLabel="Alamat" inputPlaceholder="Co. Dusun Simpar No 003" data={formData.AlamatAnak} setData={(val) => setFormData({ ...formData, AlamatAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
            </div>

            {/* Button Group */}
            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}

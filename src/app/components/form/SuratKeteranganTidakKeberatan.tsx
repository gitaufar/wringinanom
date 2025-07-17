"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";

type SuratKeteranganTidakKeberatanProps = {
  tipe: String;
};

export default function SuratKeteranganTidakKeberatan({ tipe }: SuratKeteranganTidakKeberatanProps) {
  const initialData = {
    namaPengaju: "",
    nikPengaju: "",
    kotaLahirPengaju: "",
    tanggalLahirPengaju: "",
    jenisKelaminPengaju: "",
    kewarganegaraanPengaju: "",
    statusPerkawinanPengaju: "",
    pekerjaanPengaju: "",
    agamaPengaju: "",
    alamatPengaju: "",
    namaAnak: "",
    nikAnak: "",
    kotaLahirAnak: "",
    tanggalLahirAnak: "",
    jenisKelaminAnak: "",
    kewarganegaraanAnak: "",
    statusPerkawinanAnak: "",
    pekerjaanAnak: "",
    agamaAnak: "",
    alamatAnak: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmited("submit");
    setEditData(false);
  };

  const handleReset = () => {
    setFormData(initialData);
    setSubmited(null);
    setEditData(true);
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
        <div className="flex-1 text-black text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pt-24 px-5 lg:px-[170px]">
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN TIDAK KEBERATAN
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Mohon isi sesuai data dan sejujur-jujurnya.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          {/* Nama Pengaju */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama Pengaju</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.namaPengaju} setData={(val) => setFormData({ ...formData, namaPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nikPengaju} setData={(val) => setFormData({ ...formData, nikPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} numberOnly />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.kotaLahirPengaju} setData={(val) => setFormData({ ...formData, kotaLahirPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahirPengaju} setData={(val) => setFormData({ ...formData, tanggalLahirPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown
  inputLabel="Jenis Kelamin"
  options={["Laki-laki", "Perempuan"]}
  data={formData.jenisKelaminPengaju}
  setData={(val) => setFormData({ ...formData, jenisKelaminPengaju: val })}
  setEditData={setEditData}
  editData={editData}
  submited={submited}
/>
            <InputField inputLabel="Kewarganegaraan" inputPlaceholder="Kewarganegaraan" data={formData.kewarganegaraanPengaju} setData={(val) => setFormData({ ...formData, kewarganegaraanPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown
  inputLabel="Status Perkawinan"
  options={["Belum Menikah", "Menikah"]}
  data={formData.statusPerkawinanPengaju}
  setData={(val) => setFormData({ ...formData, statusPerkawinanPengaju: val })}
  setEditData={setEditData}
  editData={editData}
  submited={submited}
/>
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaanPengaju} setData={(val) => setFormData({ ...formData, pekerjaanPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown
  inputLabel="Agama"
  options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
  data={formData.agamaPengaju}
  setData={(val) => setFormData({ ...formData, agamaPengaju: val })}
  setEditData={setEditData}
  editData={editData}
  submited={submited}
/>
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamatPengaju} setData={(val) => setFormData({ ...formData, alamatPengaju: val })} setEditData={setEditData} editData={editData} submited={submited} />
          </div>

          {/* Nama Anak */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama Anak</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.namaAnak} setData={(val) => setFormData({ ...formData, namaAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nikAnak} setData={(val) => setFormData({ ...formData, nikAnak: val })} setEditData={setEditData} editData={editData} submited={submited} numberOnly />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.kotaLahirAnak} setData={(val) => setFormData({ ...formData, kotaLahirAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahirAnak} setData={(val) => setFormData({ ...formData, tanggalLahirAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown
  inputLabel="Jenis Kelamin"
  options={["Laki-laki", "Perempuan"]}
  data={formData.jenisKelaminAnak}
  setData={(val) => setFormData({ ...formData, jenisKelaminAnak: val })}
  setEditData={setEditData}
  editData={editData}
  submited={submited}
/>
            <InputField inputLabel="Kewarganegaraan" inputPlaceholder="Kewarganegaraan" data={formData.kewarganegaraanAnak} setData={(val) => setFormData({ ...formData, kewarganegaraanAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown
  inputLabel="Status Perkawinan"
  options={["Belum Menikah", "Menikah"]}
  data={formData.statusPerkawinanAnak}
  setData={(val) => setFormData({ ...formData, statusPerkawinanAnak: val })}
  setEditData={setEditData}
  editData={editData}
  submited={submited}
/>
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaanAnak} setData={(val) => setFormData({ ...formData, pekerjaanAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
            <InputFieldDropdown
  inputLabel="Agama"
  options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
  data={formData.agamaAnak}
  setData={(val) => setFormData({ ...formData, agamaAnak: val })}
  setEditData={setEditData}
  editData={editData}
  submited={submited}
/>
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamatAnak} setData={(val) => setFormData({ ...formData, alamatAnak: val })} setEditData={setEditData} editData={editData} submited={submited} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Submit
            </button>
            <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md">
              Reset
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}

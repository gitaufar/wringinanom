"use client";


import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratPenambahanAnggotaKeluargaProps = {
  tipe: String;
};

export default function SuratPenambahanAnggotaKeluarga({ tipe }: SuratPenambahanAnggotaKeluargaProps) {
  const initialData = {
    NamaKepalaKeluarga: "",
    Kabupaten1: "",
    TanggalLahir:"",
    Agama: "",
    Perkerjaan: "",
    Alamat1:"",

    //Page1 
    namaAngotaBaru: "",
    Kabupaten2: "",
    TanggalLahir2: "",
    jenisKelamin: "",
    status: "",
    nikayah: "",
    namaibu: "",
    namaayah: "",
    hubunganantarkeluarga: "",
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


      {/* Main Content */}
      <div className="w-full pt-20">
        {/* Header */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] py-8 md:py-[60px]">
          <div className="flex flex-col items-center gap-6 flex-1">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN PENAMBAHAN ANGGOTA KELUARGA
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Nama Kepala Keluarga
            </h1>

            <InputField
              inputLabel="Nama Kepala Keluarga "
              inputPlaceholder="Nama Kepala Keluarga "
              data={formData.namaAngotaBaru}
              setData={(val) => setFormData({ ...formData, namaAngotaBaru: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel= " Kota/Kabupaten Lahir"
              inputPlaceholder=" Kota/Kabupaten Lahir"
              data={formData.Kabupaten1}
              setData={(val) => setFormData({ ...formData, Kabupaten1: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={formData.TanggalLahir}
              setData={(val) => setFormData({ ...formData, TanggalLahir: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
                inputLabel="Agama"
                options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
                data={formData.Agama}
                setData={(val) => setFormData({ ...formData, Agama: val })}
                setEditData={setEditData}
                editData={editData}
                submited={submited}
              />

            <InputField
              inputLabel="Pekerjaan"
              inputPlaceholder="Pekerjaan"
              data={formData.Perkerjaan}
              setData={(val) => setFormData({ ...formData, Perkerjaan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Alamat"
              data={formData.Alamat1}
              setData={(val) => setFormData({ ...formData, Alamat1: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited} 
            />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Nama Anggota Baru
            </h1>

            <InputField
              inputLabel="Nama Anggota Baru"
              inputPlaceholder="Nama Anggota Baru"
              data={formData.namaAngotaBaru}
              setData={(val) => setFormData({ ...formData, namaAngotaBaru: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten Lahir"
              data={formData.Kabupaten2}
              setData={(val) => setFormData({ ...formData, Kabupaten2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited} 
            />

            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={formData.TanggalLahir2}
              setData={(val) => setFormData({ ...formData, TanggalLahir2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />


            <InputFieldDropdown
              inputLabel="Jenis Kelamin"
              options={["Laki-laki", "Perempuan"]}
              data={formData.jenisKelamin}
              setData={(val) => setFormData({ ...formData, jenisKelamin: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Status"
              inputPlaceholder="Status"
              data={formData.status}
              setData={(val) => setFormData({ ...formData, status: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
        
            <InputField
              inputLabel="Nama Ayah"
              inputPlaceholder="Nama Ayah"
              data={formData.namaayah}
              setData={(val) => setFormData({ ...formData, namaayah: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Nama Ibu"
              inputPlaceholder="Nama Ibu"
              data={formData.namaibu}
              setData={(val) => setFormData({ ...formData, namaibu: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />  

            <InputField
              inputLabel="Hubungan dalam Keluarga"
              inputPlaceholder="Hubungan dalam Keluarga"
              data={formData.hubunganantarkeluarga}
              setData={(val) => setFormData({ ...formData, hubunganantarkeluarga: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />


            {/* Button Group */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}

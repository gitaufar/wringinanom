"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganBiodataPendudukProps = {
  tipe: String;
};

export default function SuratKeteranganBiodataPenduduk({ tipe }: SuratKeteranganBiodataPendudukProps) {
  const initialData = {
    NamaPengaju: "",
    NIKPengaju: "",

    //Page1 
    namaLengkap: "",
    Kabupaten: "",
    nomorKK: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    goldarah: "",
    statusperkawinan: "",
    agama: "",
    pekerjaan: "",
    pendidikan: "",
    statuskeluarga: "",
    nikibu: "",
    namaibu: "",
    nikayah: "",
    namaayah: "",
    alamatsebelum: "",
    alamatsetelah: "",
    kewarganegaraan: "",


    //Page2
    Nomorkartukeluarga: "",
    Nomorpaspor: "",
    TanggalKadaluarsaPaspor: "",
    NomorAktakelahiran: "",
    NomorAktaPerkawinan: "",
    TanggalPerkawinan: "",
    NomorAktaPerceraian: "",
    TanggalPerceraian: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Hindari reload halaman saat submit
  setSubmited("submit");
  setEditData(false);

  const data_dinamis = {
    namaPengaju: formData.NamaPengaju,
    namaLengkap: formData.namaLengkap,
    alamatAnak: formData.alamatsetelah, // Gantilah jika ada field 'alamatAnak' sendiri
    anakKe: "", // Jika tidak digunakan, hapus
    darixSaudara: "", // Jika tidak digunakan, hapus
    kotaLahir: formData.kotaLahir,
    tanggalLahir: formData.tanggalLahir,
    ayah: formData.namaayah,
    ibu: formData.namaibu,
  };

  try {
    const res = await fetch("/api/permohonan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nik: formData.NIKPengaju,
        jenis_surat: "SK Anak Kandung",
        tipe: tipe,
        keterangan: `Pengajuan Surat Keterangan Anak Kandung oleh ${formData.NamaPengaju}`,
        data_dinamis,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Gagal mengirim permohonan");
    }

    alert(`✅ Berhasil! Resi: ${result.permohonan.no_resi}`);
    window.location.href = "/";
  } catch (err: any) {
    alert(`❌ Terjadi kesalahan: ${err.message}`);
  }
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
              SURAT KETERANGAN BIODATA PENDUDUK
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
              Nama Pengaju
            </h1>

            <InputField
              inputLabel="Nama Pengaju"
              inputPlaceholder="Nama Pengaju"
              data={formData.NamaPengaju}
              setData={(val) => setFormData({ ...formData, NamaPengaju: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="NIK "
              inputPlaceholder="NIK"
              data={formData.NIKPengaju}
              setData={(val) => setFormData({ ...formData, NIKPengaju: val })}
              numberOnly
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Identitas Personal
            </h1>

            <InputField
              inputLabel="Nama Lengkap"
              inputPlaceholder="Nama Lengkap"
              data={formData.namaLengkap}
              setData={(val) => setFormData({ ...formData, namaLengkap: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten"
              data={formData.kotaLahir}
              setData={(val) => setFormData({ ...formData, kotaLahir: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={formData.tanggalLahir}
              setData={(val) => setFormData({ ...formData, tanggalLahir: val })}
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

            <InputFieldDropdown
              inputLabel="Golongan Darah"
              options={["A", "B", "AB", "O"]}
              data={formData.goldarah}
              setData={(val) => setFormData({ ...formData, goldarah: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Agama"
              options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
              data={formData.agama}
              setData={(val) => setFormData({ ...formData, agama: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Status Perkawinan"
              options={["Belum Menikah", "Menikah", "Cerai"]}
              data={formData.statusperkawinan}
              setData={(val) => setFormData({ ...formData, statusperkawinan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Perkerjaan"
              inputPlaceholder="Pekerjaan"
              data={formData.pekerjaan}
              setData={(val) => setFormData({ ...formData, pekerjaan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Pendidikan"
              inputPlaceholder="Pendidikan"
              data={formData.pendidikan}
              setData={(val) => setFormData({ ...formData, pendidikan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDropdown
              inputLabel="Status Dalam Keluarga"
              options={["Kepala Keluarga", "Istri", "Anak"]}
              data={formData.statuskeluarga}
              setData={(val) => setFormData({ ...formData, statuskeluarga: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="NIK Ibu"
              inputPlaceholder="NIK Ibu"
              data={formData.nikibu}
              setData={(val) => setFormData({ ...formData, nikibu: val })}
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
              inputLabel="NIK Ayah"
              inputPlaceholder="NIK Ayah"
              data={formData.nikayah}
              setData={(val) => setFormData({ ...formData, nikayah: val })}
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
              inputLabel="Alamat Sebelumnya"
              inputPlaceholder="Alamat Sebelumnya"
              data={formData.alamatsebelum}
              setData={(val) => setFormData({ ...formData, alamatsebelum: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat Sekarang"
              inputPlaceholder="Alamat Sekarang"
              data={formData.alamatsetelah}
              setData={(val) => setFormData({ ...formData, alamatsetelah: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            
            <InputField
              inputLabel="Kewarganegaraan"
              inputPlaceholder="Kewarganegaraan"
              data={formData.kewarganegaraan}
              setData={(val) => setFormData({ ...formData, kewarganegaraan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Kepemilikan Dokumen
            </h1>

            <InputField
              inputLabel="Nomor Kartu Keluarga"
              inputPlaceholder="Nomor Kartu Keluarga"
              data={formData.Nomorkartukeluarga}
              setData={(val) => setFormData({ ...formData, Nomorkartukeluarga: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Nomor Paspor, Kosongkan jika tidak ada"
              inputPlaceholder="Nomor Paspor"
              data={formData.Nomorpaspor}
              setData={(val) => setFormData({ ...formData, Nomorpaspor: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDate
              inputLabel="Tanggal Kadaluarsa Paspor, Kosongkan jika tidak ada"
              data={formData.TanggalKadaluarsaPaspor}
              setData={(val) => setFormData({ ...formData, TanggalKadaluarsaPaspor: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Nomor Akta Kelahiran"
              inputPlaceholder="Nomor Akta Kelahiran"
              data={formData.NomorAktakelahiran}
              setData={(val) => setFormData({ ...formData, NomorAktakelahiran: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Nomor Akta Perkawinan"
              inputPlaceholder="Nomor Akta Perkawinan"
              data={formData.NomorAktaPerkawinan}
              setData={(val) => setFormData({ ...formData, NomorAktaPerkawinan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDate
              inputLabel="Tanggal Perkawinan. Kosongkan jika tidak ada"
              data={formData.TanggalPerkawinan}
              setData={(val) => setFormData({ ...formData, TanggalPerkawinan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Nomor Akta Perceraian"
              inputPlaceholder="Nomor Akta Perceraian"
              data={formData.NomorAktaPerceraian}
              setData={(val) => setFormData({ ...formData, NomorAktaPerceraian: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputFieldDate
              inputLabel="Tanggal Perceraian. Kosongkan jika tidak ada"
              data={formData.TanggalPerceraian}
              setData={(val) => setFormData({ ...formData, TanggalPerceraian: val })}
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
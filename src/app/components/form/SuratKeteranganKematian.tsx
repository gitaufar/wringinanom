"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganKematianProps = {
  tipe: String;
};

export default function SuratKeteranganKematian({
  tipe,
}: SuratKeteranganKematianProps) {
  const initialData = {
    NamaPengaju: "",
    NIK1: "", // NIK Pengaju
    // Data Almarhum/ah
    Nama2: "",
    Namaorangtua: "",
    NIK2: "", // NIK Almarhum/ah
    Kotalahir: "",
    TanggalLahir: "",
    Jeniskelamin: "",
    Agama: "",
    Perkerjaan: "",
    Alamat: "",
    // Waktu Meninggal
    Hari3: "",
    TanggalKematian: "",
    Waktukematian: "",
    TempatKematian: "",
    Penyebabkematian: "",
    Alamat3: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  // --- FUNGSI HANDLE SUBMIT YANG TELAH DISESUAIKAN ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditData(false);

    const data_dinamis = {
      nama_pengaju: formData.NamaPengaju,
      nik_pengaju: formData.NIK1,
      // Data Almarhum/ah
      nama_almarhum: formData.Nama2,
      nama_orang_tua_almarhum: formData.Namaorangtua,
      nik_almarhum: formData.NIK2,
      kota_lahir_almarhum: formData.Kotalahir,
      tanggal_lahir_almarhum: formData.TanggalLahir,
      jenis_kelamin_almarhum: formData.Jeniskelamin,
      agama_almarhum: formData.Agama,
      pekerjaan_almarhum: formData.Perkerjaan,
      alamat_almarhum: formData.Alamat,
      // Data Kematian
      hari_kematian: formData.Hari3,
      tanggal_kematian: formData.TanggalKematian,
      waktu_kematian: formData.Waktukematian,
      tempat_kematian: formData.TempatKematian,
      penyebab_kematian: formData.Penyebabkematian,
      alamat_tempat_kematian: formData.Alamat3,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik: formData.NIK1, // NIK dari pemohon utama
          jenis_surat: "Surat Keterangan Kematian",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Kematian oleh ${formData.NamaPengaju}`,
          data_dinamis,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Gagal mengirim permohonan");
      }

      alert(`✅ Berhasil! Nomor Resi Anda: ${result.permohonan.no_resi}`);
      window.location.href = "/";

    } catch (err: any) {
      alert(`❌ Terjadi kesalahan: ${err.message}`);
      setEditData(true);
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
              SURAT KETERANGAN KEMATIAN
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] pb-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h1 className="text-black text-xl lg:text-[24px] font-bold">
              Data Pengaju
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
              inputLabel="NIK Pengaju"
              inputPlaceholder="NIK Pengaju"
              data={formData.NIK1}
              setData={(val) => setFormData({ ...formData, NIK1: val })}
              numberOnly
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <h1 className="text-black text-xl lg:text-[24px] font-bold pt-4">
              Data Almarhum/ah
            </h1>
            <InputField
              inputLabel="Nama"
              inputPlaceholder="Nama Almarhum/ah"
              data={formData.Nama2}
              setData={(val) => setFormData({ ...formData, Nama2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Nama Orang Tua"
              inputPlaceholder="Nama Ayah atau Ibu"
              data={formData.Namaorangtua}
              setData={(val) => setFormData({ ...formData, Namaorangtua: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            {/* --- PERBAIKAN: Menghubungkan NIK ini ke state NIK2 --- */}
            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK Almarhum/ah"
              data={formData.NIK2}
              setData={(val) => setFormData({ ...formData, NIK2: val })}
              numberOnly
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten Lahir"
              data={formData.Kotalahir}
              setData={(val) => setFormData({ ...formData, Kotalahir: val })}
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
              inputLabel="Jenis Kelamin"
              options={["Laki-laki", "Perempuan"]}
              data={formData.Jeniskelamin}
              setData={(val) => setFormData({ ...formData, Jeniskelamin: val })}
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
              data={formData.Alamat}
              setData={(val) => setFormData({ ...formData, Alamat: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <h1 className="text-black text-xl lg:text-[24px] font-bold pt-4">
              Waktu Meninggal
            </h1>
            <InputFieldDropdown
              inputLabel="Hari"
              options={["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]}
              data={formData.Hari3}
              setData={(val) => setFormData({ ...formData, Hari3: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputFieldDate
              inputLabel="Tanggal Kematian"
              data={formData.TanggalKematian}
              setData={(val) =>
                setFormData({ ...formData, TanggalKematian: val })
              }
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Waktu Kematian"
              inputPlaceholder="Contoh: 14:30"
              data={formData.Waktukematian}
              setData={(val) =>
                setFormData({ ...formData, Waktukematian: val })
              }
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Tempat Kematian"
              inputPlaceholder="Contoh: Rumah Sakit, Rumah, dll."
              data={formData.TempatKematian}
              setData={(val) =>
                setFormData({ ...formData, TempatKematian: val })
              }
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Penyebab Kematian"
              inputPlaceholder="Contoh: Sakit, Kecelakaan, dll."
              data={formData.Penyebabkematian}
              setData={(val) =>
                setFormData({ ...formData, Penyebabkematian: val })
              }
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Alamat Tempat Kematian"
              inputPlaceholder="Alamat lengkap tempat meninggal"
              data={formData.Alamat3}
              setData={(val) => setFormData({ ...formData, Alamat3: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            {/* Button Group */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={!editData}
                className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
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
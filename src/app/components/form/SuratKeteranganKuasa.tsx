"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganKuasaProps = {
  tipe: String;
};

export default function SuratKeteranganKuasa({
  tipe,
}: SuratKeteranganKuasaProps) {
  const initialData = {
    // Data Pemberi Kuasa
    NamaPengaju: "",
    Kotalahir: "",
    TanggalLahir: "",
    NIK1: "",
    Perkerjaan: "",
    Alamat: "",

    // Data Penerima Kuasa
    Nama2: "",
    Kotakab2: "",
    TanggalLahir2: "",
    NIK2: "",
    perkerjaan2: "",
    Alamat2: "",
    HubunganDenganPengaju: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  // --- FUNGSI HANDLE SUBMIT YANG TELAH DISESUAIKAN ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditData(false);

    const data_dinamis = {
      pemberi_kuasa: {
        nama: formData.NamaPengaju,
        kota_lahir: formData.Kotalahir,
        tanggal_lahir: formData.TanggalLahir,
        nik: formData.NIK1,
        pekerjaan: formData.Perkerjaan,
        alamat: formData.Alamat,
      },
      penerima_kuasa: {
        nama: formData.Nama2,
        kota_lahir: formData.Kotakab2,
        tanggal_lahir: formData.TanggalLahir2,
        nik: formData.NIK2,
        pekerjaan: formData.perkerjaan2,
        alamat: formData.Alamat2,
        hubungan_dengan_pemberi_kuasa: formData.HubunganDenganPengaju,
      },
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik: formData.NIK1, // NIK dari pemberi kuasa sebagai penanggung jawab
          jenis_surat: "Surat Keterangan Kuasa",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Kuasa oleh ${formData.NamaPengaju}`,
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
              SURAT KETERANGAN KUASA
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
              Data Pemberi Kuasa
            </h1>
            <InputField
              inputLabel="Nama Pemberi Kuasa"
              inputPlaceholder="Nama Pemberi Kuasa"
              data={formData.NamaPengaju}
              setData={(val) => setFormData({ ...formData, NamaPengaju: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Kota Lahir"
              inputPlaceholder="Kota Lahir"
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
            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK Pemberi Kuasa"
              data={formData.NIK1}
              setData={(val) => setFormData({ ...formData, NIK1: val })}
              numberOnly
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

            <h1 className="text-black text-xl lg:text-[24px] font-bold mt-6">
              Data Penerima Kuasa
            </h1>
            <InputField
              inputLabel="Nama Penerima Kuasa"
              inputPlaceholder="Nama Penerima Kuasa"
              data={formData.Nama2}
              setData={(val) => setFormData({ ...formData, Nama2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten Lahir"
              data={formData.Kotakab2}
              setData={(val) => setFormData({ ...formData, Kotakab2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputFieldDate
              inputLabel="Tanggal Lahir"
              data={formData.TanggalLahir2}
              setData={(val) =>
                setFormData({ ...formData, TanggalLahir2: val })
              }
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK Penerima Kuasa"
              data={formData.NIK2}
              setData={(val) => setFormData({ ...formData, NIK2: val })}
              numberOnly
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Pekerjaan"
              inputPlaceholder="Pekerjaan"
              data={formData.perkerjaan2}
              setData={(val) => setFormData({ ...formData, perkerjaan2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Alamat"
              inputPlaceholder="Alamat"
              data={formData.Alamat2}
              setData={(val) => setFormData({ ...formData, Alamat2: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />
            <InputField
              inputLabel="Hubungan dengan Pemberi Kuasa"
              inputPlaceholder="Contoh: Anak, Istri, Kerabat"
              data={formData.HubunganDenganPengaju}
              setData={(val) =>
                setFormData({ ...formData, HubunganDenganPengaju: val })
              }
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
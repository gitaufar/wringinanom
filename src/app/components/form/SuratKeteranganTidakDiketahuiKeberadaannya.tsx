"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganTidakDiketahuiKeberadaannyaProps = {
  tipe: String;
};

type FormErrors = {
  [key: string]: string | undefined;
};

export default function SuratKeteranganTidakDiketahuiKeberadaannya({ tipe }: SuratKeteranganTidakDiketahuiKeberadaannyaProps) {
  const initialData = {
    namaPengaju: "",
    nikPengaju: "",
    namaBersangkutan: "",
    nikBersangkutan: "",
    nomorKK: "",
    jenisKelamin: "",
    umur: "",
    tanggalLahir: "",
    alamat: "",
    pekerjaan: "",
    tanggalHilang:"",
    bulanHilang:"",
    tahunHilang:"",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ title: string; resi: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const handleInputChange = (field: keyof typeof initialData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((keyStr) => {
      const key = keyStr as keyof typeof initialData;
      if (!formData[key]?.trim()) {
        const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        newErrors[key] = `${fieldName} wajib diisi.`;
      }
    });
    return newErrors;
  };

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setShowConfirmModal(true);
  };

const handleConfirm = async () => {
    setLoading(true);
    setEditData(false);

    const data_dinamis = {
      nama: formData.namaBersangkutan,
      nik: formData.nikBersangkutan,
      noKK: formData.nomorKK,
      jenisKelamin: formData.jenisKelamin,
      umur: formData.umur,
      pekerjaan: formData.pekerjaan,
      alamat: formData.alamat,
      tanggalHilang: formData.tanggalHilang,
      bulanHilang: formData.bulanHilang,
      tahunHilang: formData.tahunHilang,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.nikPengaju,
          jenis_surat: "tidak_diketahui",
          tipe: tipe,
          keterangan: `Pengajuan surat untuk ${formData.namaBersangkutan} oleh ${formData.namaPengaju}`,
          data_dinamis,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

      setSuccessInfo({ title: "Pengajuan Berhasil!", resi: result.permohonan.no_resi });
    } catch (err: any) {
      setErrorInfo(`Terjadi kesalahan: ${err.message}`);
      setEditData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
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
      <div className="w-full pt-24 px-5 lg:px-[170px]">
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN TIDAK DIKETAHUI KEBERADAANNYA
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Mohon isi sesuai data dan sejujur-jujurnya.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8"
        >
          {/* DIUBAH: Semua input disesuaikan dengan sistem validasi */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju</h2>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={formData.namaPengaju} setData={(val) => handleInputChange("namaPengaju", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaPengaju} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nikPengaju} setData={(val) => handleInputChange("nikPengaju", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nikPengaju} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Orang yang Bersangkutan</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.namaBersangkutan} setData={(val) => handleInputChange("namaBersangkutan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaBersangkutan} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nikBersangkutan} setData={(val) => handleInputChange("nikBersangkutan", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nikBersangkutan} />
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor KK" data={formData.nomorKK} setData={(val) => handleInputChange("nomorKK", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.nomorKK} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" inputPlaceholder="Pilih jenis kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jenisKelamin} />
            <InputField inputLabel="Umur" inputPlaceholder="Umur" data={formData.umur} setData={(val) => handleInputChange("umur", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.umur} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalLahir} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamat} setData={(val) => handleInputChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamat} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaan} setData={(val) => handleInputChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pekerjaan} />
            <InputField inputLabel="Tanggal Mulai Tidak Diketahui" inputPlaceholder="Tanggal Hilang" data={formData.tanggalHilang} setData={(val) => handleInputChange("tanggalHilang", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.tanggalHilang} />
            <InputField inputLabel="Bulan Mulai Tidak Diketahui" inputPlaceholder="Cth: Januari, Maret, Mei dll" data={formData.bulanHilang} setData={(val) => handleInputChange("bulanHilang", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.bulanHilang} />
            <InputField inputLabel="Tahun Mulai Tidak Diketahui" inputPlaceholder="Tahun Hilang" data={formData.tahunHilang} setData={(val) => handleInputChange("tahunHilang", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tahunHilanglHilang} />
          </div>

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
       <ConfirmationModal
        isOpen={showConfirmModal || successInfo !== null || errorInfo !== null}
        onClose={() => {
          setShowConfirmModal(false);
          setErrorInfo(null);
          if (successInfo) window.location.href = "/";
        }}
        onConfirm={handleConfirm}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
        successInfo={successInfo}
      />
    </div>
  );
}

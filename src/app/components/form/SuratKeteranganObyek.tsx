"use client";

import InputField from "../../components/field/InputField";
import { useState } from "react";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganObyekProps = {
  tipe: String;
};

type FormErrors = {
  [key: string]: string | undefined;
};

export default function SuratKeteranganObyek({
  tipe,
}: SuratKeteranganObyekProps) {

  const initialData = {
  namaPengaju: "",
  nikPengaju: "",
  nop: "",
  alamatOp: "",
  alamatWp: "",
  luas: "",
  njop: "",
  totalNjop: "",
  tahunDataPbb: "", 
  tahunBelumTerbit: "",
  tujuanPengajuan: "",
};

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
      namaWajibPajak: formData.namaPengaju,
      nop: formData.nop,
      alamatObjekPajak: formData.alamatOp,
      alamatWajibPajak: formData.alamatWp,
      luas: formData.luas,
      njop: formData.njop,
      totalNJOP: formData.totalNjop,
      tahunDataPBB: formData.tahunDataPbb,
      tahunBelumTerbit: formData.tahunBelumTerbit,
      tujuanPengajuan: formData.tujuanPengajuan,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.nikPengaju,
          jenis_surat: "objek",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Objek Pajak oleh ${formData.namaPengaju}`,
          data_dinamis,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

       window.location.href = `/${result.permohonan.no_resi}`;

    } catch (err) {
      if (err instanceof Error) {
        setErrorInfo(`Terjadi kesalahan: ${err.message}`);
      } else {
        setErrorInfo("Terjadi kesalahan yang tidak diketahui.");
      }
      setEditData(true); // Izinkan edit kembali jika ada error
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setSubmited("");
    setEditData(true);
    setErrors({});
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
              SURAT KETERANGAN OBYEK
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
            noValidate
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            {/* DIUBAH: Semua input disesuaikan dengan state baru dan sistem validasi */}
            <h1 className="text-black text-xl lg:text-[24px] font-bold">Data Pengaju</h1>
            <InputField inputLabel="Nama Wajib Pajak" inputPlaceholder="Nama Wajib Pajak" data={formData.namaPengaju} setData={(val) => handleInputChange("namaPengaju", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaPengaju} />
            <InputField inputLabel="NIK Wajib Pajak" inputPlaceholder="Masukkan NIK Wajib Pajak" data={formData.nikPengaju} setData={(val) => handleInputChange("nikPengaju", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.nikPengaju} />
            
            <h1 className="text-black text-xl lg:text-[24px] font-bold pt-4">Data Objek Pajak</h1>
            <InputField inputLabel="Nomor Objek Pajak (NOP)" inputPlaceholder="Nomor Objek Pajak" data={formData.nop} setData={(val) => handleInputChange("nop", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.nop} />
            <InputField inputLabel="Alamat Objek Pajak" inputPlaceholder="Alamat Objek Pajak" data={formData.alamatOp} setData={(val) => handleInputChange("alamatOp", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamatOp} />
            <InputField inputLabel="Alamat Wajib Pajak" inputPlaceholder="Alamat Wajib Pajak" data={formData.alamatWp} setData={(val) => handleInputChange("alamatWp", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamatWp} />
            <InputField inputLabel="Luas Objek Pajak (m²)" inputPlaceholder="Luas Objek Pajak" data={formData.luas} setData={(val) => handleInputChange("luas", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.luas} />
            <InputField inputLabel="Nilai Jual Objek Pajak / M² (NJOP)" inputPlaceholder="Nilai Jual Objek Pajak (Rp)" data={formData.njop} setData={(val) => handleInputChange("njop", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.njop} />
            <InputField inputLabel="Total NJOP" inputPlaceholder="Total NJOP (Rp)" data={formData.totalNjop} setData={(val) => handleInputChange("totalNjop", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.totalNjop} />
            <InputField inputLabel="Tahun Data PBB" inputPlaceholder="Tahun Terbit SPPT" data={formData.tahunDataPbb} setData={(val) => handleInputChange("tahunDataPbb", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tahunDataPbb} />
            {/* BARU: InputField ditambahkan */}
            <InputField inputLabel="Tahun Belum Terbit" inputPlaceholder="Tahun Belum Terbit" data={formData.tahunBelumTerbit} setData={(val) => handleInputChange("tahunBelumTerbit", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tahunBelumTerbit} />
            <InputField inputLabel="Tujuan Pengajuan Surat" inputPlaceholder="Tujuan Pengajuan" data={formData.tujuanPengajuan} setData={(val) => handleInputChange("tujuanPengajuan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tujuanPengajuan} />

            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={!editData} className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium disabled:bg-blue-300 disabled:cursor-not-allowed">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">
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
        <ConfirmationModal
        isOpen={showConfirmModal || errorInfo !== null}
        onClose={() => {
          setShowConfirmModal(false);
          setErrorInfo(null);
        }}
        onConfirm={handleConfirm}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
      />

    </div>
  );
}
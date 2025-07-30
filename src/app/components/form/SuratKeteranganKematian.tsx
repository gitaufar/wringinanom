"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import InputFieldTime from "../field/InputFieldTime";
import { useState } from "react";
import type { ReactNode } from "react"; 

type SuratKeteranganKematianProps = {
  tipe: string;
};

type FormErrors = {
  [key: string]: string | undefined;
};

type ApiResponse = {
  permohonan: {
    no_resi: string;
  };
  error?: string; 
};

export default function SuratKeteranganKematian({ tipe }: SuratKeteranganKematianProps): ReactNode {
  const initialData = {
    namaPengaju: "",
    nikPengaju: "",
    no_wa:"",
    // Data Almarhum/ah
    namaAlmarhum: "",
    namaOrangTua: "",
    nikAlmarhum: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    agama: "",
    pekerjaan: "",
    alamatAlmarhum: "",
    // Waktu Meninggal
    hariKematian: "",
    tanggalKematian: "",
    waktuKematian: "",
    tempatKematian: "",
    penyebabKematian: "",
    alamatKematian: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>(""); 

  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  

  const handleInputChange = (field: keyof typeof initialData, value: string): void => {
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
        const fieldName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
        newErrors[key] = `${fieldName} wajib diisi.`;
      }
    });
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent): void => {
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
    setShowConfirmModal(false); 

    const data_dinamis = {
      nama: formData.namaAlmarhum,
      namaOrangTua: formData.namaOrangTua,
      nik: formData.nikAlmarhum,
      kota: formData.kotaLahir,
      tanggalLahir: formData.tanggalLahir,
      jenisKelamin: formData.jenisKelamin,
      agama: formData.agama,
      pekerjaan: formData.pekerjaan,
      alamat: formData.alamatAlmarhum,
      hari: formData.hariKematian,
      tanggalKematian: formData.tanggalKematian,
      waktuKematian: formData.waktuKematian,
      tempatKematian: formData.tempatKematian,
      penyebabKematian: formData.penyebabKematian,
      alamatKematian: formData.alamatKematian,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_wa:formData.no_wa,
          nik: formData.nikPengaju,
          jenis_surat: "kematian",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Kematian oleh ${formData.namaPengaju}`,
          data_dinamis,
        }),
      });

      const result = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

      window.location.href = `/${result.permohonan.no_resi}`;

    } catch (err) {
      if (err instanceof Error) {
        setErrorInfo(`Terjadi kesalahan: ${err.message}`);
      } else {
        setErrorInfo("Terjadi kesalahan yang tidak diketahui.");
      }
      setEditData(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setSubmited("");
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
            noValidate
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h1 className="text-black text-xl lg:text-[24px] font-bold">Data Pengaju</h1>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={formData.namaPengaju} setData={(val) => handleInputChange("namaPengaju", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaPengaju} />
            <InputField inputLabel="NIK Pengaju" inputPlaceholder="NIK Pengaju" data={formData.nikPengaju} setData={(val) => handleInputChange("nikPengaju", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.nikPengaju} />
            <InputField inputLabel="Nomor WA" inputPlaceholder="No. WA Pengaju" data={formData.no_wa} setData={(val) => handleInputChange("no_wa", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.no_wa} />

            <h1 className="text-black text-xl lg:text-[24px] font-bold pt-4">Data Almarhum/ah</h1>
            <InputField inputLabel="Nama" inputPlaceholder="Nama Almarhum/ah" data={formData.namaAlmarhum} setData={(val) => handleInputChange("namaAlmarhum", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaAlmarhum} />
            <InputField inputLabel="Nama Orang Tua" inputPlaceholder="Nama Ayah atau Ibu" data={formData.namaOrangTua} setData={(val) => handleInputChange("namaOrangTua", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaOrangTua} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK Almarhum/ah" data={formData.nikAlmarhum} setData={(val) => handleInputChange("nikAlmarhum", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.nikAlmarhum} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.kotaLahir} setData={(val) => handleInputChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jenisKelamin} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.agama} setData={(val) => handleInputChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.agama} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaan} setData={(val) => handleInputChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pekerjaan} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamatAlmarhum} setData={(val) => handleInputChange("alamatAlmarhum", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamatAlmarhum} />

            <h1 className="text-black text-xl lg:text-[24px] font-bold pt-4">Waktu Meninggal</h1>
            <InputFieldDropdown inputLabel="Hari" options={["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]} data={formData.hariKematian} setData={(val) => handleInputChange("hariKematian", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.hariKematian} />
            <InputFieldDate inputLabel="Tanggal Kematian" data={formData.tanggalKematian} setData={(val) => handleInputChange("tanggalKematian", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalKematian} />
            <InputFieldTime inputLabel="Waktu Kematian" data={formData.waktuKematian} setData={(val) => handleInputChange("waktuKematian", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.waktuKematian} />
            <InputField inputLabel="Tempat Kematian" inputPlaceholder="Contoh: Rumah Sakit, Rumah, dll." data={formData.tempatKematian} setData={(val) => handleInputChange("tempatKematian", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tempatKematian} />
            <InputField inputLabel="Penyebab Kematian" inputPlaceholder="Contoh: Sakit, Kecelakaan, dll." data={formData.penyebabKematian} setData={(val) => handleInputChange("penyebabKematian", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penyebabKematian} />
            <InputField inputLabel="Alamat Tempat Kematian" inputPlaceholder="Alamat lengkap tempat meninggal" data={formData.alamatKematian} setData={(val) => handleInputChange("alamatKematian", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamatKematian} />

            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={!editData || loading} className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium disabled:bg-blue-300 disabled:cursor-not-allowed">
                {loading ? "Mengirim..." : "Submit"}
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
        onConfirm={() => {
          void handleConfirm();
        }}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
      />
    </div>
  );
}
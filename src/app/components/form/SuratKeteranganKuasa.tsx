"use client";

import { useState } from "react";
import type { ReactNode } from "react"; // Impor tipe ReactNode
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganKuasaProps = {
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

export default function SuratKeteranganKuasa({
  tipe,
}: SuratKeteranganKuasaProps): ReactNode {
  const initialData = {
    pemberiKuasa: {
      nama: "",
      kotaLahir: "",
      tanggalLahir: "",
      nik: "",
      pekerjaan: "",
      alamat: "",
    },
    penerimaKuasa: {
      nama: "",
      kotaLahir: "",
      tanggalLahir: "",
      nik: "",
      pekerjaan: "",
      alamat: "",
      hubungan: "",
    },
    keperluan: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string): void => {
    const fieldParts = field.split(".");

    if (fieldParts.length > 1) {
      const [parentKey, childKey] = fieldParts;

      if (parentKey === 'pemberiKuasa' || parentKey === 'penerimaKuasa') {
        setFormData(prev => ({
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            [childKey]: value,
          },
        }));
      }
    } else {
      // DIUBAH: Mengganti 'initialState' menjadi 'initialData'
      const key = field as keyof typeof initialData;
      if (key === 'keperluan') {
        setFormData(prev => ({
          ...prev,
          [key]: value,
        }));
      }
    }

    const errorKey = field.replace('.', '_');
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const { pemberiKuasa: pemberi, penerimaKuasa: penerima } = formData;

    if (!pemberi.nama?.trim()) newErrors.pemberiKuasa_nama = "Nama Pemberi Kuasa wajib diisi.";
    if (!pemberi.kotaLahir?.trim()) newErrors.pemberiKuasa_kotaLahir = "Kota Lahir wajib diisi.";
    if (!pemberi.tanggalLahir?.trim()) newErrors.pemberiKuasa_tanggalLahir = "Tanggal Lahir wajib diisi.";
    if (!pemberi.nik?.trim()) newErrors.pemberiKuasa_nik = "NIK wajib diisi.";
    if (!pemberi.pekerjaan?.trim()) newErrors.pemberiKuasa_pekerjaan = "Pekerjaan wajib diisi.";
    if (!pemberi.alamat?.trim()) newErrors.pemberiKuasa_alamat = "Alamat wajib diisi.";

    if (!penerima.nama?.trim()) newErrors.penerimaKuasa_nama = "Nama Penerima Kuasa wajib diisi.";
    if (!penerima.kotaLahir?.trim()) newErrors.penerimaKuasa_kotaLahir = "Kota Lahir wajib diisi.";
    if (!penerima.tanggalLahir?.trim()) newErrors.penerimaKuasa_tanggalLahir = "Tanggal Lahir wajib diisi.";
    if (!penerima.nik?.trim()) newErrors.penerimaKuasa_nik = "NIK wajib diisi.";
    if (!penerima.pekerjaan?.trim()) newErrors.penerimaKuasa_pekerjaan = "Pekerjaan wajib diisi.";
    if (!penerima.alamat?.trim()) newErrors.penerimaKuasa_alamat = "Alamat wajib diisi.";
    if (!penerima.hubungan?.trim()) newErrors.penerimaKuasa_hubungan = "Hubungan wajib diisi.";
    
    if (!formData.keperluan?.trim()) newErrors.keperluan = "Keperluan wajib diisi.";

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

  const handleConfirm = async (): Promise<void> => {
    setLoading(true);
    setEditData(false);

    const data_dinamis = {
      namaPemberi: formData.pemberiKuasa.nama,
      kotaPemberi: formData.pemberiKuasa.kotaLahir,
      tanggalLahirPemberi: formData.pemberiKuasa.tanggalLahir,
      pekerjaanPemberi: formData.pemberiKuasa.pekerjaan,
      nikPemberi: formData.pemberiKuasa.nik,
      alamatPemberi: formData.pemberiKuasa.alamat,

      namaPenerima: formData.penerimaKuasa.nama,
      kotaPenerima: formData.penerimaKuasa.kotaLahir,
      tanggalLahirPenerima: formData.penerimaKuasa.tanggalLahir,
      pekerjaanPenerima: formData.penerimaKuasa.pekerjaan,
      nikPenerima: formData.penerimaKuasa.nik,
      alamatPenerima: formData.penerimaKuasa.alamat,

      hubungan: formData.penerimaKuasa.hubungan,
      keperluan: formData.keperluan,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.pemberiKuasa.nik,
          jenis_surat: "kuasa",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Kuasa oleh ${formData.pemberiKuasa.nama}`,
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

  const handleReset = (): void => {
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
            noValidate
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h1 className="text-black text-xl lg:text-[24px] font-bold">Data Pemberi Kuasa</h1>
            <InputField inputLabel="Nama Pemberi Kuasa" inputPlaceholder="Nama Pemberi Kuasa" data={formData.pemberiKuasa.nama} setData={(val) => handleInputChange("pemberiKuasa.nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberiKuasa_nama} />
            <InputField inputLabel="Kota Lahir" inputPlaceholder="Kota Lahir" data={formData.pemberiKuasa.kotaLahir} setData={(val) => handleInputChange("pemberiKuasa.kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberiKuasa_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.pemberiKuasa.tanggalLahir} setData={(val) => handleInputChange("pemberiKuasa.tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberiKuasa_tanggalLahir} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK Pemberi Kuasa" data={formData.pemberiKuasa.nik} setData={(val) => handleInputChange("pemberiKuasa.nik", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberiKuasa_nik} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pemberiKuasa.pekerjaan} setData={(val) => handleInputChange("pemberiKuasa.pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberiKuasa_pekerjaan} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.pemberiKuasa.alamat} setData={(val) => handleInputChange("pemberiKuasa.alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberiKuasa_alamat} />

            <h1 className="text-black text-xl lg:text-[24px] font-bold mt-6">Data Penerima Kuasa</h1>
            <InputField inputLabel="Nama Penerima Kuasa" inputPlaceholder="Nama Penerima Kuasa" data={formData.penerimaKuasa.nama} setData={(val) => handleInputChange("penerimaKuasa.nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerimaKuasa_nama} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.penerimaKuasa.kotaLahir} setData={(val) => handleInputChange("penerimaKuasa.kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerimaKuasa_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.penerimaKuasa.tanggalLahir} setData={(val) => handleInputChange("penerimaKuasa.tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerimaKuasa_tanggalLahir} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK Penerima Kuasa" data={formData.penerimaKuasa.nik} setData={(val) => handleInputChange("penerimaKuasa.nik", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.penerimaKuasa_nik} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.penerimaKuasa.pekerjaan} setData={(val) => handleInputChange("penerimaKuasa.pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerimaKuasa_pekerjaan} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.penerimaKuasa.alamat} setData={(val) => handleInputChange("penerimaKuasa.alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerimaKuasa_alamat} />
            <InputField inputLabel="Hubungan dengan Pemberi Kuasa" inputPlaceholder="Contoh: Anak, Istri, Kerabat" data={formData.penerimaKuasa.hubungan} setData={(val) => handleInputChange("penerimaKuasa.hubungan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerimaKuasa_hubungan} />
            
            <h1 className="text-black text-xl lg:text-[24px] font-bold mt-6">Keperluan</h1>
            <InputField inputLabel="Keperluan" inputPlaceholder="Contoh: Mengambil BPKB di Kantor Leasing" data={formData.keperluan} setData={(val) => handleInputChange("keperluan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.keperluan} />

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
        onConfirm={() => { void handleConfirm(); }}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
      />
    </div>
  );
}

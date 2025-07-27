"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganTidakKeberatanProps = {
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

export default function SuratKeteranganTidakKeberatan({
  tipe,
}: SuratKeteranganTidakKeberatanProps): ReactNode {
  const initialData = {
    pengaju: {
      nama: "",
      nik: "",
      kotaLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      statusPerkawinan: "",
      pekerjaan: "",
      agama: "",
      alamat: "",
    },
    anak: {
      nama: "",
      nik: "",
      kotaLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      statusPerkawinan: "",
      pekerjaan: "",
      agama: "",
      alamat: "",
    },
    orangtua: "",
    alamatTujuan: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // DIUBAH: Menggunakan satu handleInputChange yang bisa menangani state nested
  const handleInputChange = (field: string, value: string): void => {
    const fieldParts = field.split(".");

    if (fieldParts.length > 1) {
      const [parentKey, childKey] = fieldParts;
      if (parentKey === 'pengaju' || parentKey === 'anak') {
        setFormData(prev => ({
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            [childKey]: value,
          },
        }));
      }
    } else {
      const key = field as keyof typeof initialData;
      if (key === 'orangtua' || key === 'alamatTujuan') {
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
    const { pengaju, anak } = formData;

    Object.keys(pengaju).forEach(key => {
      const field = key as keyof typeof pengaju;
      if (!pengaju[field]?.trim()) newErrors[`pengaju_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Pengaju wajib diisi.`;
    });
    
    Object.keys(anak).forEach(key => {
      const field = key as keyof typeof anak;
      if (!anak[field]?.trim()) newErrors[`anak_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Anak wajib diisi.`;
    });

    if (!formData.orangtua?.trim()) newErrors.orangtua = "Nama Orang Tua wajib diisi.";
    if (!formData.alamatTujuan?.trim()) newErrors.alamatTujuan = "Alamat Tujuan wajib diisi.";

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
      nama: formData.pengaju.nama,
      nik: formData.pengaju.nik,
      kota: formData.pengaju.kotaLahir,
      tanggalLahir: formData.pengaju.tanggalLahir,
      jenisKelamin: formData.pengaju.jenisKelamin,
      status_erkawinan: formData.pengaju.statusPerkawinan,
      pekerjaan: formData.pengaju.pekerjaan,
      agama: formData.pengaju.agama,
      alamat: formData.pengaju.alamat,
      namaAnak: formData.anak.nama,
      nikAnak: formData.anak.nik,
      kotaAnak: formData.anak.kotaLahir,
      tanggalLahirAnak: formData.anak.tanggalLahir,
      jenisKelaminAnak: formData.anak.jenisKelamin,
      statusPerkawinanAnak: formData.anak.statusPerkawinan,
      pekerjaanAnak: formData.anak.pekerjaan,
      agamaAnak: formData.anak.agama,
      alamatAnak: formData.anak.alamat,
      alamatTujuan: formData.alamatTujuan,
      orangtua: formData.orangtua,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.pengaju.nik,
          jenis_surat: "tidak_keberatan",
          tipe: tipe,
          keterangan: `Pengajuan surat tidak keberatan oleh ${formData.pengaju.nama} untuk anaknya ${formData.anak.nama}`,
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
    setErrors({});
    setSubmited("");
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

        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8"
        >
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju (Orang Tua)</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.pengaju.nama} setData={(val) => handleInputChange("pengaju.nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_nama} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.pengaju.nik} setData={(val) => handleInputChange("pengaju.nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.pengaju_nik} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.pengaju.kotaLahir} setData={(val) => handleInputChange("pengaju.kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.pengaju.tanggalLahir} setData={(val) => handleInputChange("pengaju.tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.pengaju.jenisKelamin} setData={(val) => handleInputChange("pengaju.jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_jenisKelamin} />
            <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Menikah", "Menikah"]} data={formData.pengaju.statusPerkawinan} setData={(val) => handleInputChange("pengaju.statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_statusPerkawinan} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pengaju.pekerjaan} setData={(val) => handleInputChange("pengaju.pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_pekerjaan} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.pengaju.agama} setData={(val) => handleInputChange("pengaju.agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_agama} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.pengaju.alamat} setData={(val) => handleInputChange("pengaju.alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_alamat} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Anak</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.anak.nama} setData={(val) => handleInputChange("anak.nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_nama} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.anak.nik} setData={(val) => handleInputChange("anak.nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.anak_nik} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.anak.kotaLahir} setData={(val) => handleInputChange("anak.kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.anak.tanggalLahir} setData={(val) => handleInputChange("anak.tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.anak.jenisKelamin} setData={(val) => handleInputChange("anak.jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_jenisKelamin} />
            <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Menikah", "Menikah"]} data={formData.anak.statusPerkawinan} setData={(val) => handleInputChange("anak.statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_statusPerkawinan} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.anak.pekerjaan} setData={(val) => handleInputChange("anak.pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_pekerjaan} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.anak.agama} setData={(val) => handleInputChange("anak.agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_agama} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.anak.alamat} setData={(val) => handleInputChange("anak.alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_alamat} />
            <InputField inputLabel="Orang Tua dari Pihak Pengaju" inputPlaceholder="Contoh: Ayah / Ibu" data={formData.orangtua} setData={(val) => handleInputChange("orangtua", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.orangtua} />
            <InputField inputLabel="Alamat Tujuan" inputPlaceholder="Alamat Tujuan Anak" data={formData.alamatTujuan} setData={(val) => handleInputChange("alamatTujuan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamatTujuan} />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </form>

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

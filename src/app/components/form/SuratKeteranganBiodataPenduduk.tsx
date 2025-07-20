"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState } from "react";

type SuratKeteranganBiodataPendudukProps = {
  tipe: String;
};

// BARU: Tipe untuk objek error
type FormErrors = {
  [key:string]: string | undefined;
}

export default function SuratKeteranganBiodataPenduduk({ tipe }: SuratKeteranganBiodataPendudukProps) {
  const initialData = {
    NamaPengaju: "",
    NIKPengaju: "",
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
    Nomorkartukeluarga: "",
    Nomorpaspor: "",
    TanggalKadaluarsaPaspor: "",
    NomorAktakelahiran: "",
    NomorAktaPerkawinan: "",
    TanggalPerkawinan: "",
    NomorAktaPerceraian: "",
    TanggalPerceraian: "",
  };

  // BARU: Daftar field yang bersifat opsional
  const optionalFields: (keyof typeof initialData)[] = [
    'Nomorpaspor',
    'TanggalKadaluarsaPaspor',
    'NomorAktaPerkawinan',
    'TanggalPerkawinan',
    'NomorAktaPerceraian',
    'TanggalPerceraian'
  ];

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ title: string; resi: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({}); // BARU: State untuk error

  // BARU: Fungsi untuk menangani perubahan input sekaligus menghapus error
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // BARU: Fungsi validasi yang mengecualikan field opsional
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(keyStr => {
      const key = keyStr as keyof typeof formData;

      // Lewati validasi jika field termasuk dalam daftar opsional
      if (optionalFields.includes(key)) {
        return; 
      }

      const value = formData[key];
      if (!value || value.trim() === "") {
        const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        newErrors[key] = `${fieldName} tidak boleh kosong.`;
      }
    });

    // Contoh validasi kondisional (lebih advanced)
    if (formData.statusperkawinan === 'Menikah' && !formData.NomorAktaPerkawinan) {
        newErrors.NomorAktaPerkawinan = 'Wajib diisi jika status Menikah';
    }
    if (formData.statusperkawinan === 'Cerai' && !formData.NomorAktaPerceraian) {
        newErrors.NomorAktaPerceraian = 'Wajib diisi jika status Cerai';
    }

    return newErrors;
  };

  // DIUBAH: handleSubmit sekarang menjalankan validasi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }
    setSubmited("");
    setEditData(false);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setSubmited("");
    setEditData(false);

    const data_dinamis = {
      namaPengaju: formData.NamaPengaju,
      namaLengkap: formData.namaLengkap,
      alamatAnak: formData.alamatsetelah,
      anakKe: "",
      darixSaudara: "",
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
          tipe,
          keterangan: `Pengajuan Surat Keterangan Anak Kandung oleh ${formData.NamaPengaju}`,
          data_dinamis,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

      setSuccessInfo({ title: "Pengajuan Berhasil!", resi: result.permohonan.no_resi });
    } catch (err: any) {
      setErrorInfo(`Gagal mengirim permohonan: ${err.message}`);
      setEditData(true);
    } finally {
      setLoading(false);
    }

  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({}); // BARU: Reset error juga
    setSubmited("");
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

        
        <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>
      
      <div className="w-full pt-20">
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

        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px]">
          <form
            onSubmit={handleSubmit}
            noValidate // Mencegah validasi bawaan browser
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            {/* DIUBAH: Semua InputField sekarang menggunakan handleInputChange
              dan menerima prop 'error' untuk menampilkan pesan validasi.
            */}

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Nama Pengaju
            </h1>
            <InputField
    inputLabel="Nama Pengaju"
    inputPlaceholder="Nama Pengaju"
    data={formData.NamaPengaju}
    // DIUBAH: Menggunakan handleInputChange dan menambahkan prop error
    setData={(val) => handleInputChange("NamaPengaju", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.NamaPengaju}
  />

  <InputField
    inputLabel="NIK Pengaju"
    inputPlaceholder="NIK"
    data={formData.NIKPengaju}
    // DIUBAH: Menggunakan handleInputChange dan menambahkan prop error
    setData={(val) => handleInputChange("NIKPengaju", val)}
    numberOnly
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.NIKPengaju}
  />

  <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
    Data Identitas Personal
  </h1>

  <InputField
    inputLabel="Nama Lengkap"
    inputPlaceholder="Nama Lengkap"
    data={formData.namaLengkap}
    setData={(val) => handleInputChange("namaLengkap", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.namaLengkap}
  />

  <InputField
    inputLabel="Kota/Kabupaten Lahir"
    inputPlaceholder="Kota/Kabupaten"
    data={formData.kotaLahir}
    setData={(val) => handleInputChange("kotaLahir", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.kotaLahir}
  />

  <InputFieldDate
    inputLabel="Tanggal Lahir"
    data={formData.tanggalLahir}
    setData={(val) => handleInputChange("tanggalLahir", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.tanggalLahir}
  />

  <InputFieldDropdown
    inputLabel="Jenis Kelamin"
    options={["Laki-laki", "Perempuan"]}
    data={formData.jenisKelamin}
    setData={(val) => handleInputChange("jenisKelamin", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.jenisKelamin}
  />

  <InputFieldDropdown
    inputLabel="Golongan Darah"
    options={["A", "B", "AB", "O"]}
    data={formData.goldarah}
    setData={(val) => handleInputChange("goldarah", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.goldarah}
  />

  <InputFieldDropdown
    inputLabel="Agama"
    options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]}
    data={formData.agama}
    setData={(val) => handleInputChange("agama", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.agama}
  />

  <InputFieldDropdown
    inputLabel="Status Perkawinan"
    options={["Belum Menikah", "Menikah", "Cerai"]}
    data={formData.statusperkawinan}
    setData={(val) => handleInputChange("statusperkawinan", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.statusperkawinan}
  />

  <InputField
    inputLabel="Pekerjaan"
    inputPlaceholder="Pekerjaan"
    data={formData.pekerjaan}
    setData={(val) => handleInputChange("pekerjaan", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.pekerjaan}
  />

  <InputField
    inputLabel="Pendidikan"
    inputPlaceholder="Pendidikan"
    data={formData.pendidikan}
    setData={(val) => handleInputChange("pendidikan", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.pendidikan}
  />

  <InputFieldDropdown
    inputLabel="Status Dalam Keluarga"
    options={["Kepala Keluarga", "Istri", "Anak"]}
    data={formData.statuskeluarga}
    setData={(val) => handleInputChange("statuskeluarga", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.statuskeluarga}
  />

  <InputField
    inputLabel="NIK Ibu"
    inputPlaceholder="NIK Ibu"
    data={formData.nikibu}
    setData={(val) => handleInputChange("nikibu", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.nikibu}
  />

  <InputField
    inputLabel="Nama Ibu"
    inputPlaceholder="Nama Ibu"
    data={formData.namaibu}
    setData={(val) => handleInputChange("namaibu", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.namaibu}
  />

  <InputField
    inputLabel="NIK Ayah"
    inputPlaceholder="NIK Ayah"
    data={formData.nikayah}
    setData={(val) => handleInputChange("nikayah", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.nikayah}
  />

  <InputField
    inputLabel="Nama Ayah"
    inputPlaceholder="Nama Ayah"
    data={formData.namaayah}
    setData={(val) => handleInputChange("namaayah", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.namaayah}
  />

  <InputField
    inputLabel="Alamat Sebelumnya"
    inputPlaceholder="Alamat Sebelumnya"
    data={formData.alamatsebelum}
    setData={(val) => handleInputChange("alamatsebelum", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.alamatsebelum}
  />

  <InputField
    inputLabel="Alamat Sekarang"
    inputPlaceholder="Alamat Sekarang"
    data={formData.alamatsetelah}
    setData={(val) => handleInputChange("alamatsetelah", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.alamatsetelah}
  />

  <InputField
    inputLabel="Kewarganegaraan"
    inputPlaceholder="Kewarganegaraan"
    data={formData.kewarganegaraan}
    setData={(val) => handleInputChange("kewarganegaraan", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.kewarganegaraan}
  />

  <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
    Data Kepemilikan Dokumen
  </h1>

  <InputField
    inputLabel="Nomor Kartu Keluarga"
    inputPlaceholder="Nomor Kartu Keluarga"
    data={formData.Nomorkartukeluarga}
    setData={(val) => handleInputChange("Nomorkartukeluarga", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.Nomorkartukeluarga}
  />

  <InputField
    inputLabel="Nomor Paspor (Opsional)"
    inputPlaceholder="Nomor Paspor"
    data={formData.Nomorpaspor}
    setData={(val) => handleInputChange("Nomorpaspor", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.Nomorpaspor}
  />

  <InputFieldDate
    inputLabel="Tanggal Kadaluarsa Paspor (Opsional)"
    data={formData.TanggalKadaluarsaPaspor}
    setData={(val) => handleInputChange("TanggalKadaluarsaPaspor", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.TanggalKadaluarsaPaspor}
  />

  <InputField
    inputLabel="Nomor Akta Kelahiran"
    inputPlaceholder="Nomor Akta Kelahiran"
    data={formData.NomorAktakelahiran}
    setData={(val) => handleInputChange("NomorAktakelahiran", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.NomorAktakelahiran}
  />

  <InputField
    inputLabel="Nomor Akta Perkawinan (Opsional)"
    inputPlaceholder="Nomor Akta Perkawinan"
    data={formData.NomorAktaPerkawinan}
    setData={(val) => handleInputChange("NomorAktaPerkawinan", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.NomorAktaPerkawinan}
  />

  <InputFieldDate
    inputLabel="Tanggal Perkawinan (Opsional)"
    data={formData.TanggalPerkawinan}
    setData={(val) => handleInputChange("TanggalPerkawinan", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.TanggalPerkawinan}
  />

  <InputField
    inputLabel="Nomor Akta Perceraian (Opsional)"
    inputPlaceholder="Nomor Akta Perceraian"
    data={formData.NomorAktaPerceraian}
    setData={(val) => handleInputChange("NomorAktaPerceraian", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.NomorAktaPerceraian}
  />

  <InputFieldDate
    inputLabel="Tanggal Perceraian (Opsional)"
    data={formData.TanggalPerceraian}
    setData={(val) => handleInputChange("TanggalPerceraian", val)}
    setEditData={setEditData}
    editData={editData}
    submited={submited}
    error={errors.TanggalPerceraian}
  />

            {/* ... Lanjutkan untuk semua field lainnya, baik yang wajib maupun opsional ... */}

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium hover:bg-gray-400 transition"
              >
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
        isOpen={showConfirmModal || successInfo !== null || errorInfo !== null}
        onClose={() => {
          setShowConfirmModal(false);
          setErrorInfo(null);
          if (successInfo) window.location.href = "/";
        }}
        onConfirm={handleConfirm}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah data yang Anda isi sudah benar dan ingin melanjutkan pengajuan?"}
        successInfo={successInfo}
      />
    </div>
  );
}
"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../../components/field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganTidakKeberatanProps = {
  tipe: String;
};

type FormErrors = {
  [key: string]: string | undefined;
};

export default function SuratKeteranganTidakKeberatan({ tipe }: SuratKeteranganTidakKeberatanProps) {
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
  const [successInfo, setSuccessInfo] = useState<{ title: string; resi: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const { pengaju, anak } = formData;

    // Validasi Pengaju
    Object.keys(pengaju).forEach(key => {
      const field = key as keyof typeof pengaju;
      if (!pengaju[field]?.trim()) newErrors[`pengaju_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Pengaju wajib diisi.`;
    });
    
    // Validasi Anak
    Object.keys(anak).forEach(key => {
      const field = key as keyof typeof anak;
      if (!anak[field]?.trim()) newErrors[`anak_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Anak wajib diisi.`;
    });

    if (!formData.orangtua?.trim()) newErrors.orangtua = "Nama Orang Tua wajib diisi.";
    if (!formData.alamatTujuan?.trim()) newErrors.alamatTujuan = "Alamat Tujuan wajib diisi.";

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
  
  // BARU: Fungsi helper untuk update state
  const handlePengajuChange = (field: keyof typeof initialData.pengaju, value: string) => {
    setFormData(prev => ({ ...prev, pengaju: { ...prev.pengaju, [field]: value } }));
    const errorKey = `pengaju_${field}`;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
  };

  const handleAnakChange = (field: keyof typeof initialData.anak, value: string) => {
    setFormData(prev => ({ ...prev, anak: { ...prev.anak, [field]: value } }));
    const errorKey = `anak_${field}`;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
  };

  const handleInputChange = (field: 'orangtua' | 'alamatTujuan', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header */}
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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

        <form onSubmit={handleSubmit} noValidate className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          {/* DIUBAH: Semua input disesuaikan dengan state baru dan sistem validasi */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju (Orang Tua)</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.pengaju.nama} setData={(val) => handlePengajuChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_nama} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.pengaju.nik} setData={(val) => handlePengajuChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.pengaju_nik} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.pengaju.kotaLahir} setData={(val) => handlePengajuChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.pengaju.tanggalLahir} setData={(val) => handlePengajuChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.pengaju.jenisKelamin} setData={(val) => handlePengajuChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_jenisKelamin} />
            <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Menikah", "Menikah"]} data={formData.pengaju.statusPerkawinan} setData={(val) => handlePengajuChange("statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_statusPerkawinan} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pengaju.pekerjaan} setData={(val) => handlePengajuChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_pekerjaan} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.pengaju.agama} setData={(val) => handlePengajuChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_agama} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.pengaju.alamat} setData={(val) => handlePengajuChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_alamat} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Anak</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.anak.nama} setData={(val) => handleAnakChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_nama} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.anak.nik} setData={(val) => handleAnakChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.anak_nik} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.anak.kotaLahir} setData={(val) => handleAnakChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.anak.tanggalLahir} setData={(val) => handleAnakChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_tanggalLahir} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.anak.jenisKelamin} setData={(val) => handleAnakChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_jenisKelamin} />
            <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Menikah", "Menikah"]} data={formData.anak.statusPerkawinan} setData={(val) => handleAnakChange("statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_statusPerkawinan} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.anak.pekerjaan} setData={(val) => handleAnakChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_pekerjaan} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.anak.agama} setData={(val) => handleAnakChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_agama} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.anak.alamat} setData={(val) => handleAnakChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_alamat} />
            <InputField inputLabel="Orang Tua dari Pihak Pengaju" inputPlaceholder="Contoh: Ayah / Ibu" data={formData.orangtua} setData={(val) => handleInputChange("orangtua", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.orangtua} />
            <InputField inputLabel="Alamat Tujuan" inputPlaceholder="Alamat Tujuan Anak" data={formData.alamatTujuan} setData={(val) => handleInputChange("alamatTujuan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamatTujuan} />
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

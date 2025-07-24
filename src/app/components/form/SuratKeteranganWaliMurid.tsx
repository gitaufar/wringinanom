"use client";

import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganWaliMuridProps = {
  tipe: string;
};

type FormErrors = {
  [key: string]: string | undefined;
};

export default function SuratKeteranganWaliMurid({ tipe }: SuratKeteranganWaliMuridProps) {
  const initialData = {
  wali: {
    nama: "",
    nik: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    kewarganegaraan: "WNI",
    pekerjaan: "",
    alamat: "",
  },
  murid: {
    nama: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    pekerjaan: "Pelajar/Mahasiswa",
    kelasRomawi: "", // Field baru
    kelasHuruf: "", // Field baru
    sekolah: "", // Field baru
    alamat: "",
  },
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
    const { wali, murid } = formData;

    Object.keys(wali).forEach(key => {
      const field = key as keyof typeof wali;
      if (!wali[field]?.trim()) newErrors[`wali_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Wali wajib diisi.`;
    });
    
    Object.keys(murid).forEach(key => {
      const field = key as keyof typeof murid;
      if (!murid[field]?.trim()) newErrors[`murid_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Murid wajib diisi.`;
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
      nama: formData.wali.nama,
      kota: formData.wali.kotaLahir,
      tanggalLahir: formData.wali.tanggalLahir,
      jenisKelamin: formData.wali.jenisKelamin,
      pekerjaan: formData.wali.pekerjaan,
      alamat: formData.wali.alamat,
      namaAnak: formData.murid.nama,
      kotaAnak: formData.murid.kotaLahir,
      tanggalLahirAnak: formData.murid.tanggalLahir,
      jenisKelaminAnak: formData.murid.jenisKelamin,
      kelasRomawi: formData.murid.kelasRomawi,
      kelasHuruf: formData.murid.kelasHuruf,
      sekolah: formData.murid.sekolah,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.wali.nik,
          jenis_surat: "wali_murid",
          tipe: tipe,
          keterangan: `Pengajuan surat wali murid oleh ${formData.wali.nama} untuk murid ${formData.murid.nama}`,
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
    setErrors({});
    setEditData(true);
    setSubmited("");
  };

  // BARU: Fungsi helper untuk update state
  const handleWaliChange = (field: keyof typeof initialData.wali, value: string) => {
    setFormData(prev => ({ ...prev, wali: { ...prev.wali, [field]: value } }));
    const errorKey = `wali_${field}`;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
  };

  const handleMuridChange = (field: keyof typeof initialData.murid, value: string) => {
    setFormData(prev => ({ ...prev, murid: { ...prev.murid, [field]: value } }));
    const errorKey = `murid_${field}`;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
  };


  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Header */}
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
              SURAT KETERANGAN WALI MURID
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] pb-10">
           <form onSubmit={handleSubmit} noValidate className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-8 rounded-[15px] bg-white shadow">
            {/* DIUBAH: Semua input disesuaikan dengan state baru dan sistem validasi */}
            <div className="flex flex-col gap-6">
              <h1 className="text-black text-[32px] font-bold">Data Wali Murid (Pengaju)</h1>
              <InputField inputLabel="Nama Lengkap" inputPlaceholder="Masukkan nama lengkap wali" data={formData.wali.nama} setData={(val) => handleWaliChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.wali_nama} />
              <InputField inputLabel="NIK" inputPlaceholder="Masukkan NIK wali" data={formData.wali.nik} setData={(val) => handleWaliChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.wali_nik} />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Masukkan tempat lahir wali" data={formData.wali.kotaLahir} setData={(val) => handleWaliChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.wali_kotaLahir} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={formData.wali.tanggalLahir} setData={(val) => handleWaliChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.wali_tanggalLahir} />
              <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.wali.jenisKelamin} setData={(val) => handleWaliChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.wali_jenisKelamin} />
              <InputFieldDropdown inputLabel="Kewarganegaraan" options={["WNI", "WNA"]} data={formData.wali.kewarganegaraan} setData={(val) => handleWaliChange("kewarganegaraan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.wali_kewarganegaraan} />
              <InputField inputLabel="Pekerjaan" inputPlaceholder="Masukkan pekerjaan wali" data={formData.wali.pekerjaan} setData={(val) => handleWaliChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.wali_pekerjaan} />
              <InputField inputLabel="Alamat" inputPlaceholder="Masukkan alamat lengkap wali" data={formData.wali.alamat} setData={(val) => handleWaliChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.wali_alamat} />
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-black text-[32px] font-bold">Data Anak (Murid)</h1>
              <InputField inputLabel="Nama Anak" inputPlaceholder="Co. Siti" data={formData.murid.nama} setData={(val) => handleMuridChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_nama} />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Co. Malang" data={formData.murid.kotaLahir} setData={(val) => handleMuridChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_kotaLahir} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={formData.murid.tanggalLahir} setData={(val) => handleMuridChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_tanggalLahir} />
              <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.murid.jenisKelamin} setData={(val) => handleMuridChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_jenisKelamin} />
              <InputField inputLabel="Pekerjaan" inputPlaceholder="Co. Pelajar/Mahasiswa" data={formData.murid.pekerjaan} setData={(val) => handleMuridChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_pekerjaan} />
              {/* DIUBAH: InputField Kelas dipecah menjadi 3 */}
              <InputField inputLabel="Nama Sekolah" inputPlaceholder="Contoh: SDN 1 Simpar" data={formData.murid.sekolah} setData={(val) => handleMuridChange("sekolah", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_sekolah} />
              <InputField inputLabel="Kelas (Angka Romawi)" inputPlaceholder="Contoh: VII" data={formData.murid.kelasRomawi} setData={(val) => handleMuridChange("kelasRomawi", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_kelasRomawi} />
              <InputField inputLabel="Kelas (Huruf)" inputPlaceholder="Contoh: A" data={formData.murid.kelasHuruf} setData={(val) => handleMuridChange("kelasHuruf", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_kelasHuruf} />
              <InputField inputLabel="Alamat" inputPlaceholder="Co. Dusun Simpar No 003" data={formData.murid.alamat} setData={(val) => handleMuridChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.murid_alamat} />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">Submit</button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">Reset</button>
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
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
        successInfo={successInfo}
      />
    </div>
  );
}

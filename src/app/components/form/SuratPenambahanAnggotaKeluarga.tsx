"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratPenambahanAnggotaKeluargaProps = {
  tipe: string;
};

type FormErrors = {
  [key: string]: string | undefined;
};

export default function SuratPenambahanAnggotaKeluarga({ tipe }: SuratPenambahanAnggotaKeluargaProps) {
  const initialData = {
  kepalaKeluarga: {
    nama: "",
    nik: "",
    kotaLahir: "",
    tanggalLahir: "",
    agama: "",
    pekerjaan: "",
    alamat: "",
  },
  anggotaBaru: {
    nama: "",
    kotaLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    namaAyah: "",
    nikAyah: "",
    namaIbu: "",
    hubunganKeluarga: "",
    alamat: "", 
  },
};

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  
   const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const { kepalaKeluarga, anggotaBaru } = formData;

    Object.keys(kepalaKeluarga).forEach(key => {
      const field = key as keyof typeof kepalaKeluarga;
      if (!kepalaKeluarga[field]?.trim()) newErrors[`kepalaKeluarga_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Kepala Keluarga wajib diisi.`;
    });
    
    Object.keys(anggotaBaru).forEach(key => {
      const field = key as keyof typeof anggotaBaru;
      if (!anggotaBaru[field]?.trim()) newErrors[`anggotaBaru_${field}`] = `${field.replace(/([A-Z])/g, ' $1')} Anggota Baru wajib diisi.`;
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

    const today = new Date();
    const tanggalSurat = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    
    // DIUBAH: data_dinamis disesuaikan dengan format backend yang baru
    const data_dinamis = {
      namaKepalaKeluarga: formData.kepalaKeluarga.nama,
      kota: formData.kepalaKeluarga.kotaLahir,
      tanggalLahir: formData.kepalaKeluarga.tanggalLahir,
      agama: formData.kepalaKeluarga.agama,
      pekerjaan: formData.kepalaKeluarga.pekerjaan,
      alamat: formData.kepalaKeluarga.alamat,
      namaAnggota: formData.anggotaBaru.nama,
      kotaAnggota: formData.anggotaBaru.kotaLahir,
      tanggalLahirAnggota: formData.anggotaBaru.tanggalLahir,
      jenisKelamin: formData.anggotaBaru.jenisKelamin,
      statusPerkawinan: formData.anggotaBaru.statusPerkawinan,
      namaAyah: formData.anggotaBaru.namaAyah,
      namaIbu: formData.anggotaBaru.namaIbu,
      hubunganDalamKeluarga: formData.anggotaBaru.hubunganKeluarga,
      alamatAnggota: formData.anggotaBaru.alamat,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.kepalaKeluarga.nik,
          jenis_surat: "penambahan_anggota",
          tipe: tipe,
          keterangan: `Penambahan anggota keluarga (${formData.anggotaBaru.nama}) oleh Kepala Keluarga ${formData.kepalaKeluarga.nama}`,
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
    setErrors({});
    setSubmited("");
    setEditData(true);
  };
  

  const handleKepalaKeluargaChange = (field: keyof typeof initialData.kepalaKeluarga, value: string) => {
    setFormData(prev => ({ ...prev, kepalaKeluarga: { ...prev.kepalaKeluarga, [field]: value } }));
    const errorKey = `kepalaKeluarga_${field}`;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
  };

  const handleAnggotaBaruChange = (field: keyof typeof initialData.anggotaBaru, value: string) => {
    setFormData(prev => ({ ...prev, anggotaBaru: { ...prev.anggotaBaru, [field]: value } }));
    const errorKey = `anggotaBaru_${field}`;
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
            <h1 className="text-black text-center text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN PENAMBAHAN ANGGOTA KELUARGA
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
              <h1 className="text-black text-[32px] font-bold">Data Kepala Keluarga</h1>
              <InputField inputLabel="Nama Kepala Keluarga" inputPlaceholder="Masukkan nama kepala keluarga" data={formData.kepalaKeluarga.nama} setData={(val) => handleKepalaKeluargaChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kepalaKeluarga_nama} />
              <InputField inputLabel="NIK Kepala Keluarga" inputPlaceholder="Masukkan NIK kepala keluarga" data={formData.kepalaKeluarga.nik} setData={(val) => handleKepalaKeluargaChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.kepalaKeluarga_nik} />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Masukkan tempat lahir" data={formData.kepalaKeluarga.kotaLahir} setData={(val) => handleKepalaKeluargaChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kepalaKeluarga_kotaLahir} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={formData.kepalaKeluarga.tanggalLahir} setData={(val) => handleKepalaKeluargaChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kepalaKeluarga_tanggalLahir} />
              <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.kepalaKeluarga.agama} setData={(val) => handleKepalaKeluargaChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kepalaKeluarga_agama} />
              <InputField inputLabel="Pekerjaan" inputPlaceholder="Masukkan pekerjaan" data={formData.kepalaKeluarga.pekerjaan} setData={(val) => handleKepalaKeluargaChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kepalaKeluarga_pekerjaan} />
              <InputField inputLabel="Alamat" inputPlaceholder="Masukkan alamat" data={formData.kepalaKeluarga.alamat} setData={(val) => handleKepalaKeluargaChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kepalaKeluarga_alamat} />
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-black text-[32px] font-bold">Data Anggota Baru</h1>
              <InputField inputLabel="Nama Anggota Baru" inputPlaceholder="Masukkan nama anggota baru" data={formData.anggotaBaru.nama} setData={(val) => handleAnggotaBaruChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_nama} />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Masukkan tempat lahir" data={formData.anggotaBaru.kotaLahir} setData={(val) => handleAnggotaBaruChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_kotaLahir} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={formData.anggotaBaru.tanggalLahir} setData={(val) => handleAnggotaBaruChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_tanggalLahir} />
              <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.anggotaBaru.jenisKelamin} setData={(val) => handleAnggotaBaruChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_jenisKelamin} />
              <InputFieldDropdown inputLabel="Status Perkawinan" options={["Belum Kawin", "Kawin"]} data={formData.anggotaBaru.statusPerkawinan} setData={(val) => handleAnggotaBaruChange("statusPerkawinan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_statusPerkawinan} />
              <InputField inputLabel="Nama Ayah" inputPlaceholder="Masukkan nama ayah" data={formData.anggotaBaru.namaAyah} setData={(val) => handleAnggotaBaruChange("namaAyah", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_namaAyah} />
              <InputField inputLabel="NIK Ayah" inputPlaceholder="Masukkan NIK ayah" data={formData.anggotaBaru.nikAyah} setData={(val) => handleAnggotaBaruChange("nikAyah", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.anggotaBaru_nikAyah} />
              <InputField inputLabel="Nama Ibu" inputPlaceholder="Masukkan nama ibu" data={formData.anggotaBaru.namaIbu} setData={(val) => handleAnggotaBaruChange("namaIbu", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_namaIbu} />
              <InputField inputLabel="Hubungan dalam Keluarga" inputPlaceholder="Contoh: Anak" data={formData.anggotaBaru.hubunganKeluarga} setData={(val) => handleAnggotaBaruChange("hubunganKeluarga", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_hubunganKeluarga} />
              <InputField inputLabel="Alamat Anggota Baru" inputPlaceholder="Masukkan alamat anggota baru" data={formData.anggotaBaru.alamat} setData={(val) => handleAnggotaBaruChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anggotaBaru_alamat} />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">Submit</button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">Reset</button>
            </div>
          </form>
        </div>

        {/* ... Footer tidak berubah ... */}
      </div>

      {/* BARU: Modal konfirmasi ditambahkan di sini */}
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

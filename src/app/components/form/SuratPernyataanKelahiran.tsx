"use client";


import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import InputFieldTime from "../../components/field/InputFieldTime"; // BARU

type SuratPernyataanKelahiranProps = {
  tipe: string;
};

type FormErrors = {
  [key: string]: string | undefined;
};


export default function SuratPernyataanKelahiran({ tipe }: SuratPernyataanKelahiranProps) {
  const initialData = {
  pengaju: {
    nama: "",
    nik: "",
  },
  anak: {
    nama: "",
    jenisKelamin: "",
    kotaLahir: "",
    tanggalLahir: "",
    hariLahir: "",
    jamLahir: "", 
    anakKe: "",   
    agama: "",
    alamat: "",
  },
  ayah: {
    nama: "",
    nik: "",
    kotaLahir: "",
    tanggalLahir: "",
    pekerjaan: "",
    alamat: "",
  },
  ibu: {
    nama: "",
    nik: "",
    kotaLahir: "",
    tanggalLahir: "",
    pekerjaan: "",
    alamat: "",
  },
  nomorKK: "",
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
    const { pengaju, anak, ayah, ibu, nomorKK } = formData;

    Object.keys(pengaju).forEach(k => { const key = k as keyof typeof pengaju; if (!pengaju[key]?.trim()) newErrors[`pengaju_${key}`] = `Data Pengaju: ${key} wajib diisi.`});
    Object.keys(anak).forEach(k => { const key = k as keyof typeof anak; if (!anak[key]?.trim()) newErrors[`anak_${key}`] = `Data Anak: ${key} wajib diisi.`});
    Object.keys(ayah).forEach(k => { const key = k as keyof typeof ayah; if (!ayah[key]?.trim()) newErrors[`ayah_${key}`] = `Data Ayah: ${key} wajib diisi.`});
    Object.keys(ibu).forEach(k => { const key = k as keyof typeof ibu; if (!ibu[key]?.trim()) newErrors[`ibu_${key}`] = `Data Ibu: ${key} wajib diisi.`});

    if(!nomorKK?.trim()) newErrors.nomorKK = "Nomor KK wajib diisi.";
    
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
      namaAnak: formData.anak.nama,
      jenisKelamin: formData.anak.jenisKelamin,
      kota: formData.anak.kotaLahir,
      tnggalLahir: formData.anak.tanggalLahir,
      hari: formData.anak.hariLahir,
      jam: formData.anak.jamLahir,
      agama: formData.anak.agama,
      alamat: formData.anak.alamat,
      angkaNum: formData.anak.anakKe,

      namaAyah: formData.ayah.nama,
      nikAyah: formData.ayah.nik,
      kotaLahirAyah: formData.ayah.kotaLahir,
      tanggalLahirAyah: formData.ayah.tanggalLahir,
      pekerjaanAyah: formData.ayah.pekerjaan,
      alamatAyah: formData.ayah.alamat,
      namaIbu: formData.ibu.nama,
      nikIbu: formData.ibu.nik,
      kotaLahirIbu: formData.ibu.kotaLahir,
      tanggalLahirIbu: formData.ibu.tanggalLahir,
      pekerjaanIbu: formData.ibu.pekerjaan,
      alamatIbu: formData.ibu.alamat,
      noKK: formData.nomorKK,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: formData.pengaju.nik,
          jenis_surat: "pernyataan_kelahiran",
          tipe: tipe,
          keterangan: `Pengajuan Surat Pernyataan Kelahiran oleh ${formData.pengaju.nama} untuk anak ${formData.anak.nama}`,
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

  const handleInputChange = (field: keyof typeof initialData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };
  const createNestedHandler = <T extends 'pengaju' | 'anak' | 'ayah' | 'ibu'>(group: T) => 
    (field: keyof typeof initialData[T], value: string) => {
      setFormData(prev => ({ ...prev, [group]: { ...prev[group], [field]: value } }));
      const errorKey = `${group}_${String(field)}`;
      if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
  };
  const handlePengajuChange = createNestedHandler('pengaju');
  const handleAnakChange = createNestedHandler('anak');
  const handleAyahChange = createNestedHandler('ayah');
  const handleIbuChange = createNestedHandler('ibu');

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

  {/* Avatar & Judul */}
  <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
  <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
    Pengajuan Surat
  </div>
</div>


      {/* Main Content */}
      <div className="w-full pt-20">
        {/* Header */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] py-8 md:py-[60px]">
          <div className="flex flex-col items-center gap-6 flex-1">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT PERNYATAAN KELAHIRAN
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            {/* DIUBAH: Semua input disesuaikan dengan state baru dan sistem validasi */}
            <h1 className="text-black text-[32px] font-bold">Data Pengaju</h1>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={formData.pengaju.nama} setData={(val) => handlePengajuChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_nama} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.pengaju.nik} setData={(val) => handlePengajuChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pengaju_nik} />

            <h1 className="text-black text-[32px] font-bold">Data Anak</h1>
            <InputField inputLabel="Nama" inputPlaceholder="Nama" data={formData.anak.nama} setData={(val) => handleAnakChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_nama} />
            <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.anak.jenisKelamin} setData={(val) => handleAnakChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_jenisKelamin} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.anak.kotaLahir} setData={(val) => handleAnakChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.anak.tanggalLahir} setData={(val) => handleAnakChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_tanggalLahir} />
            <InputFieldDropdown inputLabel="Hari Lahir" options={["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]} data={formData.anak.hariLahir} setData={(val) => handleAnakChange("hariLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_hariLahir} />
            <InputFieldTime inputLabel="Jam Lahir" data={formData.anak.jamLahir} setData={(val) => handleAnakChange("jamLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_jamLahir} />
            <InputField inputLabel="Anak Ke-" inputPlaceholder="Contoh: 1, 2, 3" data={formData.anak.anakKe} setData={(val) => handleAnakChange("anakKe", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.anak_anakKe} />
            <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Hindu", "Buddha", "Konghucu"]} data={formData.anak.agama} setData={(val) => handleAnakChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_agama} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.anak.alamat} setData={(val) => handleAnakChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.anak_alamat} />
            
            <h1 className="text-black text-[32px] font-bold">Data Ayah</h1>
            <InputField inputLabel="Nama Ayah" inputPlaceholder="Nama Ayah" data={formData.ayah.nama} setData={(val) => handleAyahChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ayah_nama} />
            <InputField inputLabel="NIK Ayah" inputPlaceholder="NIK Ayah" data={formData.ayah.nik} setData={(val) => handleAyahChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.ayah_nik} />
            <InputField inputLabel="Kota/Kabupaten Lahir Ayah" inputPlaceholder="Kota/Kabupaten Lahir Ayah" data={formData.ayah.kotaLahir} setData={(val) => handleAyahChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ayah_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir Ayah" data={formData.ayah.tanggalLahir} setData={(val) => handleAyahChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ayah_tanggalLahir} />
            <InputField inputLabel="Pekerjaan Ayah" inputPlaceholder="Pekerjaan Ayah" data={formData.ayah.pekerjaan} setData={(val) => handleAyahChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ayah_pekerjaan} />
            <InputField inputLabel="Alamat Ayah" inputPlaceholder="Alamat Ayah" data={formData.ayah.alamat} setData={(val) => handleAyahChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ayah_alamat} />
            
            <h1 className="text-black text-[32px] font-bold">Data Ibu</h1>
            <InputField inputLabel="Nama Ibu" inputPlaceholder="Nama Ibu" data={formData.ibu.nama} setData={(val) => handleIbuChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ibu_nama} />
            <InputField inputLabel="NIK Ibu" inputPlaceholder="NIK Ibu" data={formData.ibu.nik} setData={(val) => handleIbuChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.ibu_nik} />
            <InputField inputLabel="Kota/Kabupaten Lahir Ibu" inputPlaceholder="Kota/Kabupaten Lahir Ibu" data={formData.ibu.kotaLahir} setData={(val) => handleIbuChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ibu_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir Ibu" data={formData.ibu.tanggalLahir} setData={(val) => handleIbuChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ibu_tanggalLahir} />
            <InputField inputLabel="Pekerjaan Ibu" inputPlaceholder="Pekerjaan Ibu" data={formData.ibu.pekerjaan} setData={(val) => handleIbuChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ibu_pekerjaan} />
            <InputField inputLabel="Alamat Ibu" inputPlaceholder="Alamat Ibu" data={formData.ibu.alamat} setData={(val) => handleIbuChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.ibu_alamat} />

            <h1 className="text-black text-[32px] font-bold">Data Kartu Keluarga</h1>
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor Kartu Keluarga" data={formData.nomorKK} setData={(val) => handleInputChange("nomorKK", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nomorKK} />
            
            <div className="flex gap-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">Submit</button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">Reset</button>
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

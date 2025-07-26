"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganKuasaProps = {
  tipe: String;
};

type FormErrors = {
  [key: string]: string | undefined;
};

export default function SuratKeteranganKuasa({
  tipe,
}: SuratKeteranganKuasaProps) {
  const initialData = {
  pemberiKuasa: {
    nama: "",
    kotaLahir: "",
    tanggalLahir: "",
    nik: "",
    pekerjaan: "",
    alamat: ""
  },
  penerimaKuasa: {
    nama: "",
    kotaLahir: "",
    tanggalLahir: "",
    nik: "",
    pekerjaan: "",
    alamat: "",
    hubungan: ""
  },
  keperluan: ""
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
    const { pemberiKuasa: pemberi, penerimaKuasa: penerima } = formData;

    // Validasi Pemberi Kuasa
    if (!pemberi.nama?.trim()) newErrors.pemberi_nama = "Nama Pemberi Kuasa wajib diisi.";
    if (!pemberi.kotaLahir?.trim()) newErrors.pemberi_kotaLahir = "Kota Lahir wajib diisi.";
    if (!pemberi.tanggalLahir?.trim()) newErrors.pemberi_tanggalLahir = "Tanggal Lahir wajib diisi.";
    if (!pemberi.nik?.trim()) newErrors.pemberi_nik = "NIK wajib diisi.";
    if (!pemberi.pekerjaan?.trim()) newErrors.pemberi_pekerjaan = "Pekerjaan wajib diisi.";
    if (!pemberi.alamat?.trim()) newErrors.pemberi_alamat = "Alamat wajib diisi.";
    
    // Validasi Penerima Kuasa
    if (!penerima.nama?.trim()) newErrors.penerima_nama = "Nama Penerima Kuasa wajib diisi.";
    if (!penerima.kotaLahir?.trim()) newErrors.penerima_kotaLahir = "Kota Lahir wajib diisi.";
    if (!penerima.tanggalLahir?.trim()) newErrors.penerima_tanggalLahir = "Tanggal Lahir wajib diisi.";
    if (!penerima.nik?.trim()) newErrors.penerima_nik = "NIK wajib diisi.";
    if (!penerima.pekerjaan?.trim()) newErrors.penerima_pekerjaan = "Pekerjaan wajib diisi.";
    if (!penerima.alamat?.trim()) newErrors.penerima_alamat = "Alamat wajib diisi.";
    if (!penerima.hubungan?.trim()) newErrors.penerima_hubungan = "Hubungan wajib diisi.";
     if (!formData.keperluan?.trim()) newErrors.keperluan = "Keperluan wajib diisi.";

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

  // DIUBAH: Ganti seluruh fungsi ini dengan versi baru
  const handleConfirm = async () => {
    setLoading(true);
    setEditData(false);

    // Memetakan dari state frontend ke format backend yang baru
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
    setSubmited(null);
    setEditData(true);
    setErrors({});
  };

   const handlePemberiChange = (field: keyof typeof initialData.pemberiKuasa, value: string) => {
    setFormData(prev => ({ ...prev, pemberiKuasa: { ...prev.pemberiKuasa, [field]: value } }));
    const errorKey = `pemberi_${field}`;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
  };
  
  const handlePenerimaChange = (field: keyof typeof initialData.penerimaKuasa, value: string) => {
    setFormData(prev => ({ ...prev, penerimaKuasa: { ...prev.penerimaKuasa, [field]: value } }));
    const errorKey = `penerima_${field}`;
    if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: undefined }));
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
            {/* DIUBAH: Semua input disesuaikan dengan state baru dan sistem validasi */}
            <h1 className="text-black text-xl lg:text-[24px] font-bold">Data Pemberi Kuasa</h1>
            <InputField inputLabel="Nama Pemberi Kuasa" inputPlaceholder="Nama Pemberi Kuasa" data={formData.pemberiKuasa.nama} setData={(val) => handlePemberiChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberi_nama} />
            <InputField inputLabel="Kota Lahir" inputPlaceholder="Kota Lahir" data={formData.pemberiKuasa.kotaLahir} setData={(val) => handlePemberiChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberi_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.pemberiKuasa.tanggalLahir} setData={(val) => handlePemberiChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberi_tanggalLahir} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK Pemberi Kuasa" data={formData.pemberiKuasa.nik} setData={(val) => handlePemberiChange("nik", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberi_nik} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pemberiKuasa.pekerjaan} setData={(val) => handlePemberiChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberi_pekerjaan} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.pemberiKuasa.alamat} setData={(val) => handlePemberiChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pemberi_alamat} />

            <h1 className="text-black text-xl lg:text-[24px] font-bold mt-6">Data Penerima Kuasa</h1>
            <InputField inputLabel="Nama Penerima Kuasa" inputPlaceholder="Nama Penerima Kuasa" data={formData.penerimaKuasa.nama} setData={(val) => handlePenerimaChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerima_nama} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.penerimaKuasa.kotaLahir} setData={(val) => handlePenerimaChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerima_kotaLahir} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={formData.penerimaKuasa.tanggalLahir} setData={(val) => handlePenerimaChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerima_tanggalLahir} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK Penerima Kuasa" data={formData.penerimaKuasa.nik} setData={(val) => handlePenerimaChange("nik", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.penerima_nik} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.penerimaKuasa.pekerjaan} setData={(val) => handlePenerimaChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerima_pekerjaan} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.penerimaKuasa.alamat} setData={(val) => handlePenerimaChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerima_alamat} />
            <InputField inputLabel="Hubungan dengan Pemberi Kuasa" inputPlaceholder="Contoh: Anak, Istri, Kerabat" data={formData.penerimaKuasa.hubungan} setData={(val) => handlePenerimaChange("hubungan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.penerima_hubungan} />
            <InputField inputLabel="Keperluan" inputPlaceholder="Contoh: Mengambil BPKB di Kantor Leasing" data={formData.keperluan} 
              setData={(val) => {
                setFormData({ ...formData, keperluan: val });
                if (errors.keperluan) setErrors(prev => ({ ...prev, keperluan: undefined }));
              }}
              setEditData={setEditData} 
              editData={editData} 
              submited={submited} 
              error={errors.keperluan} 
            />

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
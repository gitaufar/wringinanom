"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";


type SuratKeteranganDitinggalSuamiAtauIstriProps = {
  tipe: String;
};

type FormErrors = {
  [key: string]: string | undefined;
};

export default function SuratKeteranganDitinggalSuamiAtauIstri({ tipe }: SuratKeteranganDitinggalSuamiAtauIstriProps) {
  const initialState = {
    namaPengaju: "",
    nikPengaju: "",
    pihakYgMeninggalkan: {
      namaLengkap: "",
      umur: "",
      alamat: "",
      pekerjaan: ""
    },
    pihakYgDitinggalkan: {
      status: "",
      namaLengkap: "",
      umur: "",
      alamat: "",
      pekerjaan: "",
      tanggalMeninggalkan: ""
    },
    Lama_Tahun: "",
    Lama_Bulan: "",
  };

  const [form, setForm] = useState(initialState);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  
  // BARU: State untuk modal dan validasi
  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ title: string; resi: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

   // BARU: Fungsi validasi untuk data bertingkat
  // GANTI DENGAN VERSI INI YANG LEBIH AMAN:
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    // Pengecekan 'penjaga' (!form.namaPengaju) ditambahkan sebelum .trim()
    if (!form.namaPengaju || !form.namaPengaju.trim()) newErrors.namaPengaju = "Nama Pengaju wajib diisi.";
    if (!form.nikPengaju || !form.nikPengaju.trim()) newErrors.nikPengaju = "NIK Pengaju wajib diisi.";

    const { pihakYgMeninggalkan: meninggalkan } = form;
    if (!meninggalkan.namaLengkap || !meninggalkan.namaLengkap.trim()) newErrors.meninggalkan_namaLengkap = "Nama Lengkap wajib diisi.";
    if (!meninggalkan.umur || !meninggalkan.umur.trim()) newErrors.meninggalkan_umur = "Umur wajib diisi.";
    if (!meninggalkan.alamat || !meninggalkan.alamat.trim()) newErrors.meninggalkan_alamat = "Alamat wajib diisi.";
    if (!meninggalkan.pekerjaan || !meninggalkan.pekerjaan.trim()) newErrors.meninggalkan_pekerjaan = "Pekerjaan wajib diisi.";
    
    const { pihakYgDitinggalkan: ditinggalkan } = form;
    if (!ditinggalkan.status || !ditinggalkan.status.trim()) newErrors.ditinggalkan_status = "Status Pasangan wajib dipilih.";
    if (!ditinggalkan.namaLengkap || !ditinggalkan.namaLengkap.trim()) newErrors.ditinggalkan_namaLengkap = "Nama Lengkap wajib diisi.";
    if (!ditinggalkan.umur || !ditinggalkan.umur.trim()) newErrors.ditinggalkan_umur = "Umur wajib diisi.";
    if (!ditinggalkan.alamat || !ditinggalkan.alamat.trim()) newErrors.ditinggalkan_alamat = "Alamat wajib diisi.";
    if (!ditinggalkan.pekerjaan || !ditinggalkan.pekerjaan.trim()) newErrors.ditinggalkan_pekerjaan = "Pekerjaan wajib diisi.";
    if (!ditinggalkan.tanggalMeninggalkan || !ditinggalkan.tanggalMeninggalkan.trim()) newErrors.ditinggalkan_tanggalMeninggalkan = "Tanggal meninggalkan wajib diisi.";
    
    if (!form.Lama_Tahun || !form.Lama_Tahun.trim()) newErrors.Lama_Tahun = "Lama Tahun wajib diisi.";
    if (!form.Lama_Bulan || !form.Lama_Bulan.trim()) newErrors.Lama_Bulan = "Lama Bulan wajib diisi.";

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

// DIUBAH: Ganti seluruh fungsi ini
  const handleConfirm = async () => {
    setLoading(true);
    setEditData(false);

    // Membuat format tanggal DD-MM-YYYY untuk Tanggal_Surat
    const today = new Date();
    const tanggalSurat = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    // Memetakan dari state frontend ke format yang diinginkan backend
    const data_dinamis = {
      // Data Pihak yang Ditinggalkan (diasumsikan sebagai Pihak 1)
      nama1: form.pihakYgDitinggalkan.namaLengkap,
      umur1: form.pihakYgDitinggalkan.umur,
      pekerjaan1: form.pihakYgDitinggalkan.pekerjaan,
      alamat1: form.pihakYgDitinggalkan.alamat,
      statusPasangan2: form.pihakYgDitinggalkan.status,

      // Data Pihak yang Meninggalkan (diasumsikan sebagai Pihak 2)
      nama2: form.pihakYgMeninggalkan.namaLengkap,
      umur2: form.pihakYgMeninggalkan.umur,
      pekerjaan2: form.pihakYgMeninggalkan.pekerjaan,
      alamat2: form.pihakYgMeninggalkan.alamat,
      
      // Data Tambahan
      LamaTahun: form.Lama_Tahun,
      LamaBulan: form.Lama_Bulan,
    
      // Catatan: TanggalMenigallkan belum ada di format backend Anda, 
      // namun datanya ada di form.pihakYgDitinggalkan.tanggalMeninggalkan jika diperlukan.
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: form.nikPengaju,
          jenis_surat: "ditinggal_pasangan",
          tipe,
          keterangan: `Pengajuan Surat Ditinggal Pasangan oleh ${form.namaPengaju}`,
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
    setForm(initialState);
    setErrors({});
    setSubmited(null);
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
              SURAT KETERANGAN DITINGGAL SUAMI ATAU ISTRI
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
            {/* DIUBAH: Semua input field disesuaikan dengan struktur data baru dan sistem validasi */}
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Nama Pengaju
            </h1>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={form.namaPengaju} setData={(val) => { setForm({ ...form, namaPengaju: val }); if(errors.namaPengaju) setErrors(prev => ({...prev, namaPengaju: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaPengaju} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikPengaju} setData={(val) => { setForm({ ...form, nikPengaju: val }); if(errors.nikPengaju) setErrors(prev => ({...prev, nikPengaju: undefined})) }} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.nikPengaju} />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Pasangan Yang Meninggalkan
            </h1>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={form.pihakYgMeninggalkan.namaLengkap} setData={(val) => { setForm(p => ({...p, pihakYgMeninggalkan: {...p.pihakYgMeninggalkan, namaLengkap: val}})); if(errors.meninggalkan_namaLengkap) setErrors(e => ({...e, meninggalkan_namaLengkap: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.meninggalkan_namaLengkap} />
            <InputField inputLabel="Umur" inputPlaceholder="Umur" data={form.pihakYgMeninggalkan.umur} setData={(val) => { setForm(p => ({...p, pihakYgMeninggalkan: {...p.pihakYgMeninggalkan, umur: val}})); if(errors.meninggalkan_umur) setErrors(e => ({...e, meninggalkan_umur: undefined})) }} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.meninggalkan_umur} />
            <InputField inputLabel="Alamat" inputPlaceholder="Masukan Alamat" data={form.pihakYgMeninggalkan.alamat} setData={(val) => { setForm(p => ({...p, pihakYgMeninggalkan: {...p.pihakYgMeninggalkan, alamat: val}})); if(errors.meninggalkan_alamat) setErrors(e => ({...e, meninggalkan_alamat: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.meninggalkan_alamat} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={form.pihakYgMeninggalkan.pekerjaan} setData={(val) => { setForm(p => ({...p, pihakYgMeninggalkan: {...p.pihakYgMeninggalkan, pekerjaan: val}})); if(errors.meninggalkan_pekerjaan) setErrors(e => ({...e, meninggalkan_pekerjaan: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.meninggalkan_pekerjaan} />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Pasangan Yang Ditinggalkan
            </h1>
            <InputFieldDropdown inputLabel="Status Pasangan" options={["Suami", "Istri"]} data={form.pihakYgDitinggalkan.status} setData={(val) => { setForm(p => ({...p, pihakYgDitinggalkan: {...p.pihakYgDitinggalkan, status: val}})); if(errors.ditinggalkan_status) setErrors(e => ({...e, ditinggalkan_status: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.ditinggalkan_status} />
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={form.pihakYgDitinggalkan.namaLengkap} setData={(val) => { setForm(p => ({...p, pihakYgDitinggalkan: {...p.pihakYgDitinggalkan, namaLengkap: val}})); if(errors.ditinggalkan_namaLengkap) setErrors(e => ({...e, ditinggalkan_namaLengkap: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.ditinggalkan_namaLengkap} />
            <InputField inputLabel="Umur" inputPlaceholder="Umur" data={form.pihakYgDitinggalkan.umur} setData={(val) => { setForm(p => ({...p, pihakYgDitinggalkan: {...p.pihakYgDitinggalkan, umur: val}})); if(errors.ditinggalkan_umur) setErrors(e => ({...e, ditinggalkan_umur: undefined})) }} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.ditinggalkan_umur} />
            <InputField inputLabel="Alamat" inputPlaceholder="Masukan Alamat" data={form.pihakYgDitinggalkan.alamat} setData={(val) => { setForm(p => ({...p, pihakYgDitinggalkan: {...p.pihakYgDitinggalkan, alamat: val}})); if(errors.ditinggalkan_alamat) setErrors(e => ({...e, ditinggalkan_alamat: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.ditinggalkan_alamat} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={form.pihakYgDitinggalkan.pekerjaan} setData={(val) => { setForm(p => ({...p, pihakYgDitinggalkan: {...p.pihakYgDitinggalkan, pekerjaan: val}})); if(errors.ditinggalkan_pekerjaan) setErrors(e => ({...e, ditinggalkan_pekerjaan: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.ditinggalkan_pekerjaan} />
            <InputFieldDate inputLabel="Tanggal Meninggalkan" data={form.pihakYgDitinggalkan.tanggalMeninggalkan} setData={(val) => { setForm(p => ({...p, pihakYgDitinggalkan: {...p.pihakYgDitinggalkan, tanggalMeninggalkan: val}})); if(errors.ditinggalkan_tanggalMeninggalkan) setErrors(e => ({...e, ditinggalkan_tanggalMeninggalkan: undefined})) }} setEditData={setEditData} editData={editData} submited={submited} error={errors.ditinggalkan_tanggalMeninggalkan} />
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Lama Ditinggalkan
            </h1>
            <InputField 
              inputLabel="Lama Meninggalkan (Tahun)" 
              inputPlaceholder="Contoh: 2" 
              data={form.Lama_Tahun} 
              setData={(val) => { setForm({ ...form, Lama_Tahun: val }); if(errors.Lama_Tahun) setErrors(prev => ({...prev, Lama_Tahun: undefined})) }} 
              numberOnly 
              setEditData={setEditData} 
              editData={editData} 
              submited={submited} 
              error={errors.Lama_Tahun} 
            />
            <InputField 
              inputLabel="Lama Meninggalkan (Bulan)" 
              inputPlaceholder="Contoh: 6" 
              data={form.Lama_Bulan} 
              setData={(val) => { setForm({ ...form, Lama_Bulan: val }); if(errors.Lama_Bulan) setErrors(prev => ({...prev, Lama_Bulan: undefined})) }} 
              numberOnly 
              setEditData={setEditData} 
              editData={editData} 
              submited={submited} 
              error={errors.Lama_Bulan} 
            />

            <div className="flex gap-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium transition-colors hover:bg-gray-400">
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
"use client";

import { useState } from "react";
import type { ReactNode } from "react"; 
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type SuratKeteranganDitinggalSuamiAtauIstriProps = {
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

export default function SuratKeteranganDitinggalSuamiAtauIstri({
  tipe,
}: SuratKeteranganDitinggalSuamiAtauIstriProps): ReactNode {
  const initialState = {
    no_wa:"",
    namaPengaju: "",
    nikPengaju: "",
    pihakYgMeninggalkan: {
      namaLengkap: "",
      umur: "",
      alamat: "",
      pekerjaan: "",
    },
    pihakYgDitinggalkan: {
      status: "",
      namaLengkap: "",
      umur: "",
      alamat: "",
      pekerjaan: "",
      tanggalMeninggalkan: "",
    },
    Lama_Tahun: "",
    Lama_Bulan: "",
  };

  const [form, setForm] = useState(initialState);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);


  const handleInputChange = (field: string, value: string): void => {
    const fieldParts = field.split(".");
    
    if (fieldParts.length > 1) {
      const [parentKey, childKey] = fieldParts as [keyof typeof form, string];
      
      setForm(prev => ({
        ...prev,
        [parentKey]: {
          ...(typeof prev[parentKey] === 'object' && prev[parentKey] !== null ? prev[parentKey] : {}),
          [childKey]: value,
        },
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field.replace('.', '_')]) {
      setErrors(prev => ({ ...prev, [field.replace('.', '_')]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.namaPengaju.trim()) newErrors.namaPengaju = "Nama Pengaju wajib diisi.";
    if (!form.nikPengaju.trim()) newErrors.nikPengaju = "NIK Pengaju wajib diisi.";

    const { pihakYgMeninggalkan: m } = form;
    if (!m.namaLengkap.trim()) newErrors.pihakYgMeninggalkan_namaLengkap = "Nama Lengkap wajib diisi.";
    if (!m.umur.trim()) newErrors.pihakYgMeninggalkan_umur = "Umur wajib diisi.";
    if (!m.alamat.trim()) newErrors.pihakYgMeninggalkan_alamat = "Alamat wajib diisi.";
    if (!m.pekerjaan.trim()) newErrors.pihakYgMeninggalkan_pekerjaan = "Pekerjaan wajib diisi.";

    const { pihakYgDitinggalkan: d } = form;
    if (!d.status.trim()) newErrors.pihakYgDitinggalkan_status = "Status Pasangan wajib dipilih.";
    if (!d.namaLengkap.trim()) newErrors.pihakYgDitinggalkan_namaLengkap = "Nama Lengkap wajib diisi.";
    if (!d.umur.trim()) newErrors.pihakYgDitinggalkan_umur = "Umur wajib diisi.";
    if (!d.alamat.trim()) newErrors.pihakYgDitinggalkan_alamat = "Alamat wajib diisi.";
    if (!d.pekerjaan.trim()) newErrors.pihakYgDitinggalkan_pekerjaan = "Pekerjaan wajib diisi.";
    if (!d.tanggalMeninggalkan.trim()) newErrors.pihakYgDitinggalkan_tanggalMeninggalkan = "Tanggal meninggalkan wajib diisi.";

    if (!form.Lama_Tahun.trim()) newErrors.Lama_Tahun = "Lama Tahun wajib diisi.";
    if (!form.Lama_Bulan.trim()) newErrors.Lama_Bulan = "Lama Bulan wajib diisi.";

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
      nama1: form.pihakYgDitinggalkan.namaLengkap,
      umur1: form.pihakYgDitinggalkan.umur,
      pekerjaan1: form.pihakYgDitinggalkan.pekerjaan,
      alamat1: form.pihakYgDitinggalkan.alamat,
      statusPasangan2: form.pihakYgDitinggalkan.status,
      nama2: form.pihakYgMeninggalkan.namaLengkap,
      umur2: form.pihakYgMeninggalkan.umur,
      pekerjaan2: form.pihakYgMeninggalkan.pekerjaan,
      alamat2: form.pihakYgMeninggalkan.alamat,
      LamaTahun: form.Lama_Tahun,
      LamaBulan: form.Lama_Bulan,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_wa:form.no_wa,
          nik: form.nikPengaju,
          jenis_surat: "ditinggal_pasangan",
          tipe,
          keterangan: `Pengajuan Surat Ditinggal Pasangan oleh ${form.namaPengaju}`,
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
    setForm(initialState);
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
            <h1 className="text-black text-center text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN DITINGGAL SUAMI ATAU ISTRI
            </h1>
            <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
              Mohon isi sesuai data dan dengan sejujur-jujurnya.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] pb-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h2 className="text-black text-xl lg:text-2xl font-bold">
              Nama Pengaju
            </h2>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={form.namaPengaju} setData={(val) => handleInputChange("namaPengaju", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaPengaju} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={form.nikPengaju} setData={(val) => handleInputChange("nikPengaju", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.nikPengaju} />
            <InputField inputLabel="Nomor WA" inputPlaceholder="No. WA Pengaju" data={form.no_wa} setData={(val) => handleInputChange("no_wa", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.no_wa} />

            <h2 className="text-black text-xl lg:text-2xl font-bold pt-4">
              Data Pasangan Yang Meninggalkan
            </h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={form.pihakYgMeninggalkan.namaLengkap} setData={(val) => handleInputChange("pihakYgMeninggalkan.namaLengkap", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgMeninggalkan_namaLengkap} />
            <InputField inputLabel="Umur" inputPlaceholder="Umur" data={form.pihakYgMeninggalkan.umur} setData={(val) => handleInputChange("pihakYgMeninggalkan.umur", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgMeninggalkan_umur} />
            <InputField inputLabel="Alamat" inputPlaceholder="Masukan Alamat" data={form.pihakYgMeninggalkan.alamat} setData={(val) => handleInputChange("pihakYgMeninggalkan.alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgMeninggalkan_alamat} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={form.pihakYgMeninggalkan.pekerjaan} setData={(val) => handleInputChange("pihakYgMeninggalkan.pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgMeninggalkan_pekerjaan} />

            <h2 className="text-black text-xl lg:text-2xl font-bold pt-4">
              Data Pasangan Yang Ditinggalkan
            </h2>
            <InputFieldDropdown inputLabel="Status Pasangan" options={["Suami", "Istri"]} data={form.pihakYgDitinggalkan.status} setData={(val) => handleInputChange("pihakYgDitinggalkan.status", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgDitinggalkan_status} />
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={form.pihakYgDitinggalkan.namaLengkap} setData={(val) => handleInputChange("pihakYgDitinggalkan.namaLengkap", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgDitinggalkan_namaLengkap} />
            <InputField inputLabel="Umur" inputPlaceholder="Umur" data={form.pihakYgDitinggalkan.umur} setData={(val) => handleInputChange("pihakYgDitinggalkan.umur", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgDitinggalkan_umur} />
            <InputField inputLabel="Alamat" inputPlaceholder="Masukan Alamat" data={form.pihakYgDitinggalkan.alamat} setData={(val) => handleInputChange("pihakYgDitinggalkan.alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgDitinggalkan_alamat} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={form.pihakYgDitinggalkan.pekerjaan} setData={(val) => handleInputChange("pihakYgDitinggalkan.pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgDitinggalkan_pekerjaan} />
            <InputFieldDate inputLabel="Tanggal Meninggalkan" data={form.pihakYgDitinggalkan.tanggalMeninggalkan} setData={(val) => handleInputChange("pihakYgDitinggalkan.tanggalMeninggalkan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pihakYgDitinggalkan_tanggalMeninggalkan} />
            
            <h2 className="text-black text-xl lg:text-2xl font-bold pt-4">
              Lama Ditinggalkan
            </h2>
            <InputField inputLabel="Lama Meninggalkan (Tahun)" inputPlaceholder="Contoh: 2" data={form.Lama_Tahun} setData={(val) => handleInputChange("Lama_Tahun", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.Lama_Tahun} />
            <InputField inputLabel="Lama Meninggalkan (Bulan)" inputPlaceholder="Contoh: 6" data={form.Lama_Bulan} setData={(val) => handleInputChange("Lama_Bulan", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.Lama_Bulan} />

            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium transition-colors hover:bg-gray-400">
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
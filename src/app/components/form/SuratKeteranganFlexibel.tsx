"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import InputFieldDropdown from "../field/InputFieldDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useState } from "react";
import type { ReactNode } from "react";

type FlexibelProps = {
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

// Data struktur alamat berdasarkan aturan yang diberikan
const DUSUN_RT_RW_MAP = {
  simpar: {
    rtOptions: ["1", "2", "3", "4", "5", "6", "7", "8"] as string[],
    getRW: (rt: string) => {
      const rtNum = parseInt(rt);
      if (rtNum >= 1 && rtNum <= 6) return "1";
      if (rtNum >= 7 && rtNum <= 8) return "2";
      return "";
    },
  },
  kunci: {
    rtOptions: [
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
    ] as string[],
    getRW: (rt: string) => {
      const rtNum = parseInt(rt);
      if (rtNum >= 9 && rtNum <= 14) return "3";
      if (rtNum >= 15 && rtNum <= 19) return "4";
      return "";
    },
  },
  besuki: {
    rtOptions: [
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
    ] as string[],
    getRW: (rt: string) => {
      const rtNum = parseInt(rt);
      if (rtNum >= 20 && rtNum <= 23) return "5";
      if (rtNum >= 24 && rtNum <= 28) return "6";
      return "";
    },
  },
};

export default function SuratKeteranganFlexibel({
  tipe,
}: FlexibelProps): ReactNode {
  const initialData = {
    keterangan: "",
    no_wa: "",
    namaPengaju: "",
    kotaLahir: "",
    tanggalLahir: "",
    nik: "",
    jenisKelamin: "",
    agama: "",
    dusun: "",
    rt: "",
    rw: "",
    statusPerkawinan: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof typeof initialData,
    value: string
  ): void => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Auto-reset RT dan RW ketika dusun berubah
      if (field === "dusun") {
        newData.rt = "";
        newData.rw = "";
      }

      // Auto-set RW ketika RT berubah
      if (field === "rt" && prev.dusun) {
        const dusunKey =
          prev.dusun.toLowerCase() as keyof typeof DUSUN_RT_RW_MAP;
        if (DUSUN_RT_RW_MAP[dusunKey]) {
          newData.rw = DUSUN_RT_RW_MAP[dusunKey].getRW(value);
        }
      }

      return newData;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((keyStr) => {
      const key = keyStr as keyof typeof initialData;
      if (!formData[key]?.trim()) {
        const fieldName = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        newErrors[key] = `${fieldName} wajib diisi.`;
      }
    });
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
      nama: formData.namaPengaju,
      kota: formData.kotaLahir,
      tanggalLahir: formData.tanggalLahir,
      nik: formData.nik,
      jenisKelamin: formData.jenisKelamin,
      agama: formData.agama,
      statusPerkawinan: formData.statusPerkawinan,
      alamat: formData.dusun,
      rt: formData.rt,
      rw: formData.rw,
      keterangan: formData.keterangan,
    };

    console.log("DATA YANG DIKIRIM KE BACKEND:", data_dinamis);

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_wa: formData.no_wa,
          nik: formData.nik,
          jenis_surat: "Surat Keterangan Flexibel",
          tipe: tipe,
          keterangan: `Pengajuan Surat Keterangan Flexibel oleh ${formData.namaPengaju}`,
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

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setSubmited("");
    setEditData(true);
  };

  // Get RT options berdasarkan dusun yang dipilih
  const getRTOptions = (): string[] => {
    if (!formData.dusun) return [];
    const dusunKey =
      formData.dusun.toLowerCase() as keyof typeof DUSUN_RT_RW_MAP;
    return DUSUN_RT_RW_MAP[dusunKey]?.rtOptions || [];
  };

  // Get RW options berdasarkan dusun dan RT yang dipilih
  const getRWOptions = (): string[] => {
    if (!formData.dusun || !formData.rt) return [];
    const dusunKey =
      formData.dusun.toLowerCase() as keyof typeof DUSUN_RT_RW_MAP;
    const rw = DUSUN_RT_RW_MAP[dusunKey]?.getRW(formData.rt);
    return rw ? [rw] : [];
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
              SURAT KETERANGAN FLEXIBEL
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
            <InputField
              inputLabel="Keterangan Surat"
              inputPlaceholder="Keterangan untuk surat yang diminta"
              data={formData.keterangan}
              setData={(val) => handleInputChange("keterangan", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.keterangan}
            />

            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Data Diri Pengaju
            </h1>

            <InputField
              inputLabel="Nama Pengaju"
              inputPlaceholder="Nama Pengaju"
              data={formData.namaPengaju}
              setData={(val) => handleInputChange("namaPengaju", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.namaPengaju}
            />

            <InputField
              inputLabel="NIK"
              inputPlaceholder="NIK"
              data={formData.nik}
              setData={(val) => handleInputChange("nik", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              numberOnly
              error={errors.nik}
            />

            <InputField
              inputLabel="Nomor WA"
              inputPlaceholder="No. WA Pengaju"
              data={formData.no_wa}
              setData={(val) => handleInputChange("no_wa", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.no_wa}
            />

            <InputField
              inputLabel="Kota/Kabupaten Lahir"
              inputPlaceholder="Kota/Kabupaten Lahir"
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
              inputLabel="Agama"
              options={["Islam", "Kristen", "Hindu", "Buddha", "Konghucu"]}
              data={formData.agama}
              setData={(val) => handleInputChange("agama", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.agama}
            />

            {/* Alamat Section */}
            <h2 className="text-black text-[24px] lg:text-[32px] font-bold mt-4">
              Alamat
            </h2>

            <InputFieldDropdown
              inputLabel="Dusun"
              options={["Simpar", "Kunci", "Besuki"]}
              data={formData.dusun}
              setData={(val) => handleInputChange("dusun", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.dusun}
            />

            <InputFieldDropdown
              inputLabel="RT"
              options={getRTOptions()}
              data={formData.rt}
              setData={(val) => handleInputChange("rt", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.rt}
            />

            <InputFieldDropdown
              inputLabel="RW"
              options={getRWOptions()}
              data={formData.rw}
              setData={(val) => handleInputChange("rw", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.rw}
            />

            <InputFieldDropdown
              inputLabel="Status Perkawinan"
              options={["Cerai Hidup", "Cerai Mati", "Kawin Tercatat", "Kawin Tidak Tercatat", "Belum Kawin"]}
              data={formData.statusPerkawinan}
              setData={(val) => handleInputChange("statusPerkawinan", val)}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
              error={errors.statusPerkawinan}
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium"
              >
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
        isOpen={showConfirmModal || errorInfo !== null}
        onClose={() => {
          setShowConfirmModal(false);
          setErrorInfo(null);
        }}
        onConfirm={() => {
          void handleConfirm();
        }}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
      />
    </div>
  );
}

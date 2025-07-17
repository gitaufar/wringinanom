"use client";


import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";
import InputFieldDropdown from "../field/InputFieldDropdown";

type SuratKeteranganObyekProps = {
  tipe: String;
};

export default function SuratKeteranganObyek({ tipe }: SuratKeteranganObyekProps) {
  const initialData = {
    NamaPengaju: "",
    NOP: "",
    AlaamatOP: "",
    AlamatOPW: "",
    Luas: "",
    NJOP: "",
    TotalNJOP: "",
    PBB: "",
    Tahunterbit: "",
    TujuanPengajuan: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmited("submit");
    setEditData(false);
  };

  const handleReset = () => {
    setFormData(initialData);
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
              SURAT KETERANGAN OBYEK
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
            className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
          >
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              Nama Pengaju
            </h1>

            <InputField
              inputLabel="Nama Wajib Pajak "
              inputPlaceholder="Nama Wajib Pajak "
              data={formData.NamaPengaju}
              setData={(val) => setFormData({ ...formData, NamaPengaju: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />



            <InputField
              inputLabel="Nomor Objek Pajak (NOP)"
              inputPlaceholder="Nomor Objek Pajak"
              data={formData.NOP}
              setData={(val) => setFormData({ ...formData, NOP: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited} 
            />

            <InputField
              inputLabel="Alamat Objek Pajak"
              inputPlaceholder="Alamat Objek Pajak"
              data={formData.AlaamatOP}
              setData={(val) => setFormData({ ...formData, AlaamatOP: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Alamat Objek Pajak Wajib"
              inputPlaceholder="Alamat Objek Pajak Wajib"
              data={formData.AlamatOPW}
              setData={(val) => setFormData({ ...formData, AlamatOPW: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Luas Objek Pajak"
              inputPlaceholder="Luas Objek Pajak"
              data={formData.Luas}
              setData={(val) => setFormData({ ...formData, Luas: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Nilai Jual Objek Pajak (NJOP)"
              inputPlaceholder="Nilai Jual Objek Pajak"
              data={formData.NJOP}
              setData={(val) => setFormData({ ...formData, NJOP: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Total NJOP"
              inputPlaceholder="Total NJOP"
              data={formData.TotalNJOP}
              setData={(val) => setFormData({ ...formData, TotalNJOP: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Pajak Bumi dan Bangunan (PBB)"
              inputPlaceholder="Pajak Bumi dan Bangunan"
              data={formData.PBB}
              setData={(val) => setFormData({ ...formData, PBB: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            <InputField
              inputLabel="Tahun Terbit"
              inputPlaceholder="Tahun Terbit"
              data={formData.Tahunterbit}
              setData={(val) => setFormData({ ...formData, Tahunterbit: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />


            <InputField
              inputLabel="Tujuan Pengajuan"
              inputPlaceholder="Tujuan Pengajuan"
              data={formData.TujuanPengajuan}
              setData={(val) => setFormData({ ...formData, TujuanPengajuan: val })}
              setEditData={setEditData}
              editData={editData}
              submited={submited}
            />

            {/* Button Group */}
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
    </div>
  );
}
